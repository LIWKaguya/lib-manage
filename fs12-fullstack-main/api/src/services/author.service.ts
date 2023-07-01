import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<AuthorDocument[]> => {
  return Author.find().populate('books', {
    ISBN: 1,
    title: 1,
    publisher: 1,
    publishedYear: 1,
  })
}

const create = async (author: AuthorDocument): Promise<AuthorDocument> => {
  return author.save()
}

const findByProperties = async (properties: {
  name: string
}): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findOne(properties).populate('books', {
    ISBN: 1,
    title: 1,
    publisher: 1,
    publishedYear: 1,
  })

  if (!foundAuthor) {
    throw new NotFoundError('Author is not found with these properties')
  }

  return foundAuthor
}

const findById = async (authorId: string): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findById(authorId).populate('books', {
    ISBN: 1,
    title: 1,
    publisher: 1,
    publishedYear: 1,
  })

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const update = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  }).populate('books', { ISBN: 1, title: 1, publisher: 1, publishedYear: 1 })

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const deleteAuthor = async (authorId: string) => {
  return Author.findByIdAndRemove(authorId)
}

const deleteBook = async (bookId: string) => {
  const updatedBooks = await Author.updateMany(
    {},
    {
      $pull: { books: { $in: [bookId] } },
    }
  ).populate('books', {
    ISBN: 1,
    title: 1,
    publisher: 1,
    publishedYear: 1,
  })

  return updatedBooks
}

export default {
  update,
  findAll,
  findById,
  create,
  deleteAuthor,
  findByProperties,
  deleteBook,
}
