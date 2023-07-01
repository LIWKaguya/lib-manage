import mongoose, { Document, Types } from 'mongoose'

export type UserDocument = Document & {
  username: string
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
  borrowedBooks: Types.ObjectId[]
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  borrowedBooks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book',
    default: [],
  },
})

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
