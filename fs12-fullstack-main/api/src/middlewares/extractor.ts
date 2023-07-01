import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { ForbiddenError } from '../helpers/apiError'
import { verify, decode, JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

export const googleAuthenticate = passport.authenticate('google-id-token', {
  session: false,
})

export const checkAuth = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]
      const decodedUser = verify(token, JWT_SECRET)
      req.user = decodedUser
      return next()
    }
    throw new ForbiddenError()
  } catch (error) {
    console.log(error)
    throw new ForbiddenError()
  }
}
