import { NextResponse } from 'next/server'
import ERROR from '~/Libs/error'
import queryDB from '~/app/api/Libs/queryDB'
import validatorFields from '~/app/api/Libs/validatorFields'
import authenticateToken from '~/app/api/Libs/auth'
import cleanerData from '~/app/api/Libs/cleanerData'
import payloadFormatter from '~/app/api/Libs/Utils/payloadFormatter'
import { Post } from '~/app/api/entities'
import { EMPTY_OBJECT } from '~/app/Libs/Utils/constants'

export const POST = async request => {
  try{
    const hasPermission = authenticateToken({ headers: request.headers, neededAdmind: true })
    const data = await request.json()
    const isValid = validatorFields({ data, shape: Post.shape })
    if(hasPermission && isValid){
      const payload = await queryDB({
        entity: 'post',
        queryType: 'create',
        data
      })
      const response = cleanerData({ payload })
      return NextResponse.json(response, { status: 201 })
    } 
    return ERROR.FORBIDDEN()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}

export const GET = async request => {
  try{
    const hasPermission = authenticateToken({ headers: request.headers, neededAdmind: false })
    if(!hasPermission) return ERROR.FORBIDDEN()
    const filter = Object.fromEntries(request?.nextUrl?.searchParams ?? '')
    const payloads = await queryDB({
      entity: 'post',
      queryType: 'findMany',
      ...(filter.length > 0 ? { filter } : EMPTY_OBJECT)
    })
    if(payloads){
      const response = payloadFormatter(payloads.map(payload => cleanerData({ payload })))
      return NextResponse.json(response, { status: 200 })
    }
    return ERROR.NOT_FOUND()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}