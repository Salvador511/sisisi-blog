import db from '~/app/api/Libs/db'
import ERROR from '~/Libs/error'

export const getOptions = ({ filter, data: d }) => {
  const filters = filter ? { where: { ...filter } } : {}
  const data = d ? { data: d } : {}
  return Object.assign(filters, data)
}

/*
 * Executes various database operations based on the specified query type.
 *
 * **Supported Query Types:**
 * - `findUnique`: Retrieves a single record by unique identifier.
 * - `findMany`: Retrieves multiple records based on filters.
 * - `create`: Creates a new record.
 * - `update`: Updates an existing record if found.
 * - `delete`: Deletes an existing record if found.
 *
 * **Responses:**
 * - Returns the result of the database operation or null if not found.
 * - Returns `ERROR.NOT_FOUND()` for missing update/delete targets.
 *
 * @param {Object} params - Parameters for the database query.
 * @param {string} params.entity - The database entity name (table/model).
 * @param {Object} [params.filter] - Filter conditions for the query.
 * @param {string} params.queryType - The type of query operation to perform.
 * @param {Object} [params.data] - Data for create or update operations.
 * @returns {Promise<Object|null>} - The result of the database operation or null if not found.
 */

const queryDB = async ({ entity, filter, queryType, data }) => {
  const opts = getOptions({ filter, data }) 
  let payload
  let element
  let options
  switch(queryType){
    case 'findUnique':
      return await db[entity].findUnique({ ...opts })
  
    case 'findMany': 
      payload = await db[entity].findMany({ ...opts })
      return payload.length ? payload : null

    case 'create':
      return await db[entity].create({ ...opts })
      
    case 'update':
      if (!opts?.where?.id) return ERROR.NOT_FOUND()
      options = getOptions({ filter })
      element = await db[entity].findUnique(options)
      payload = element ? await db[entity].update({ ...opts }) : null
      return payload
    
    case 'delete':
      options = getOptions({ filter })
      element = await db[entity].findUnique(options)
      payload = element ? await db[entity].delete({ ...opts }) : null
      return payload 

    default: 
      return null
  }
}

export default queryDB