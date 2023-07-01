import mongoose, { Document, Types } from 'mongoose'

export type BookDocument = Document & {
  ISBN: string
  title: string
  description: string
  publisher: string
  authors: Types.ObjectId[]
  categories: string[]
  publishedYear: number
  status: string
  borrowedId: Types.ObjectId | null
  returnedId: string[]
  borrowedDate: Date[]
  returnedDate: Date[]
}

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  authors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Author',
    default: [],
  },
  categories: {
    type: [String],
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available',
  },
  borrowedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  borrowedDate: {
    type: [Date],
    default: [],
  },
  returnedDate: {
    type: [Date],
    default: [],
  },
})

bookSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
