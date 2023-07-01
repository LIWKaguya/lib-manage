import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

export const googleLogin = (req: Request, res: Response) => {
  const { user } = req
  const token = jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: '5h',
    }
  )
  const { exp } = jwt.decode(token) as JwtPayload
  res.json({ token, user, exp })
}
