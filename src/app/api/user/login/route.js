import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ERROR from '~/Libs/error'
import queryDB from '~/app/api/Libs/queryDB'
import validatorFields from '~/app/api/Libs/validatorFields'
import { User } from '~/app/api/entities'

export const POST = async request => {
  try {
    const data = await request.json()
    const isValid = validatorFields({ data, shape: User.shape })

    if (!isValid) return ERROR.INVALID_FIELDS()
    
    const user = await queryDB({
      entity: 'user',
      queryType: 'findUnique',
      filter: { username: data.username },
    }) 
    if(!user) return ERROR.INVALID_FIELDS()
    
    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if(!isPasswordValid) return ERROR.INVALID_FIELDS()    
    const token = jwt.sign({ 
      userId: user.id,
      isAdmin: user.isAdmin
    }, process.env.JWT_SECRET)
    return NextResponse.json({ token, user }, { status: 200 })
 
  } catch (error) {
    console.error('Error on login', error)
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}
