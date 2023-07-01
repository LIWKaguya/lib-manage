import GoogleTokenStrategy from 'passport-google-id-token'

import { VerifiedCallback, ParsedToken } from '../types'
import { GOOGLE_CLIENT_ID, LIST_OF_ADMINS } from '../util/secrets'
import User from '../models/User'

export default function () {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      console.log('googleId: ', googleId)
      console.log('parsedToken:', parsedToken)
      const { given_name, family_name, email } = parsedToken.payload
      let user = await User.findOne({ email: parsedToken.payload.email })
      if (!user) {
        const newUser = new User({
          username: given_name + family_name,
          email,
          firstName: given_name,
          lastName: family_name,
          isAdmin: LIST_OF_ADMINS.split(',').includes(email),
        })
        user = await newUser.save()
      }
      done(null, user)
    }
  )
}
