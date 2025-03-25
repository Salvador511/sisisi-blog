import jwt from 'jsonwebtoken'
import ERROR from '~/Libs/error'

export const authenticateToken = ({ headers }) => {
  const authHeader = headers.get('authorization')
  const token = authHeader && authHeader.replace(/Bearer /,'')
  if (token) {
    const { professorId } = jwt.verify(token, process.env.JWT_SECRET)
    return professorId
  }
  return ERROR.FORBIDDEN()
}

