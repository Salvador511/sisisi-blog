import { NextResponse } from 'next/server'
import { Post } from '~/api/entities'
import authenticateToken from '~/app/api/Libs/auth'
import ERROR from '~/Libs/error'
import queryDB from '~/app/api/Libs/queryDB'
import cleanerData from '~/app/api/Libs/cleanerData'
import validatorFields from '~/app/api/Libs/validatorFields'

export const GET = async (request, { params }) => {
  try {
    const { id } = params
    if (!Number(id)) return ERROR.INVALID_FIELDS()
    const hasPermission = authenticateToken({ headers: request.headers, neededAdmind: false })
    if (!hasPermission) return ERROR.FORBIDDEN()
    const payload = await queryDB({
      entity: 'post',
      queryType: 'findUnique',
      filter: { id: Number(id) }
    })
    if (payload) {
      const response = cleanerData({ payload })
      return NextResponse.json(response, { status: 200 })
    }
    return ERROR.NOT_FOUND()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}

export const PUT = async (request, { params }) => {
  try {
    const { id } = params
    const hasPermission = authenticateToken({ headers: request.headers, neededAdmind: true })
    const data = await request.json()
    const isValid = validatorFields({ data, shape: Post.shape })
    if (hasPermission && isValid) {
      const payload = await queryDB({
        entity: 'post',
        queryType: 'update',
        filter: { id: Number(id) },
        data
      })
      if (!payload) return ERROR.NOT_FOUND()
      const response = cleanerData({ payload })
      return NextResponse.json(response, { status: 200 })
    }
    return ERROR.FORBIDDEN()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}

export const PATCH = async (request, { params }) => {
  try {
    const { id } = params
    const hasPermission = authenticateToken({ headers: request.headers, neededAdmind: true })
    if (!hasPermission) return ERROR.FORBIDDEN()
    const data = await request.json()
    const payload = await queryDB({
      entity: 'post',
      queryType: 'update',
      filter: { id: Number(id) },
      data
    })
    if (payload) {
      const response = cleanerData({ payload })
      return NextResponse.json(response, { status: 200 })
    }
    return ERROR.NOT_FOUND()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params
    const hasPermission = authenticateToken({ headers: request.headers, neededAdmind: true })
    if (!hasPermission) return ERROR.FORBIDDEN()
    const payload = await queryDB({
      entity: 'post',
      queryType: 'update',
      filter: { id: Number(id) },
      data: {
        active: false
      }
    })
    if (payload) {
      const response = cleanerData({ payload })
      return NextResponse.json(response, { status: 200 })
    }
    return ERROR.NOT_FOUND()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}
