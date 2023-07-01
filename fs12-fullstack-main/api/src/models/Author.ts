import mongoose, { Document, Types } from 'mongoose'

export type AuthorDocument = Document & {
  name: string
  books: Types.ObjectId[]
  yearOfBirth: number
  description: string
}

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book',
    default: [],
  },
  yearOfBirth: {
    type: Number,
  },
  description: {
    type: String,
  },
})

authorSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
