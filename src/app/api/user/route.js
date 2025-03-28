import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import ERROR from '~/Libs/error'
import queryDB from '~/app/api/Libs/queryDB'
import validatorFields from '~/app/api/Libs/validatorFields'
import { User } from '~/app/api/entities'
import cleanerData from '../Libs/cleanerData'

export const POST = async request => {
  try {
    const data = await request.json()

    const isValid = validatorFields({ data, shape: User.shape })
    if (!isValid) return ERROR.INVALID_FIELDS()

    const existingUser = await queryDB({
      entity: 'user',
      queryType: 'findUnique',
      filter: { username: data.username }
    })

    if (existingUser) return ERROR.USER_ALREADY_EXISTS()
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const payload = await queryDB({
      entity: 'user',
      queryType: 'create',
      data: {
        ...data,
        password: hashedPassword,
      }
    })

    const response = cleanerData({ payload })

    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}