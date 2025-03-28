// src/app/api/user/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ERROR from '~/Libs/error'
import queryDB from '~/app/api/Libs/queryDB'
import validatorFields from '~/app/api/Libs/validatorFields'
import { User } from '~/app/api/entities'

export const POST = async (request) => {
  try {
    const data = await request.json()

    const isValid = validatorFields({ data, shape: User.shape })
    if (!isValid) return ERROR.INVALID_FIELDS()

    const existingUser = await queryDB({
      entity: 'user',
      queryType: 'findUnique',
      filter: { username: data.username }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await queryDB({
      entity: 'user',
      queryType: 'create',
      data: {
        ...data,
        password: hashedPassword,
        isAdmin: false,
        active: true
      }
    })

    const token = jwt.sign(
      {
        userId: newUser.id,
        isAdmin: newUser.isAdmin
      },
      process.env.JWT_SECRET
    )

    return NextResponse.json(
      {
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          name: newUser.name,
          lastName: newUser.lastName,
          isAdmin: newUser.isAdmin
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error on register', error)
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    )
  }
}