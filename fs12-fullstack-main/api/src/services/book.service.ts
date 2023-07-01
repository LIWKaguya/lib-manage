import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'
import { CustomFilterQuery } from '../types'
import { UpdateResult } from 'mongodb'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const customFind = async (
  queries: Partial<CustomFilterQuery>
): Promise<BookDocument[]> => {
  return await Book.find(queries)
    .populate('authors', {
      name: 1,
      yearOfBirth: 1,
    })
    .populate('borrowedId', {
      username: 1,
      email: 1,
    })
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId)
    .populate('authors', {
      name: 1,
      yearOfBirth: 1,
    })
    .populate('borrowedId', {
      username: 1,
      email: 1,
    })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findByISBN = async (ISBN: string): Promise<BookDocument> => {
  const foundBooks = await Book.findOne({ ISBN })
    .populate('authors', {
      name: 1,
      yearOfBirth: 1,
    })
    .populate('borrowedId', {
      username: 1,
      email: 1,
    })

  if (!foundBooks) {
    throw new NotFoundError(`Book ${ISBN} not found`)
  }

  return foundBooks
}

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find()
    .populate('authors', { name: 1, yearOfBirth: 1 })
    .populate('borrowedId', {
      username: 1,
      email: 1,
    })
}

const update = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })
    .populate('authors', { name: 1, yearOfBirth: 1 })
    .populate('borrowedId', {
      username: 1,
      email: 1,
    })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const deleteAuthor = async (authorId: string): Promise<UpdateResult> => {
  const updatedBooks = await Book.updateMany(
    {},
    {
      $pull: { authors: { $in: [authorId] } },
    }
  )
    .populate('authors', { name: 1, yearOfBirth: 1 })
    .populate('borrowedId', {
      username: 1,
      email: 1,
    })

  return updatedBooks
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

export default {
  create,
  findById,
  findAll,
  findByISBN,
  customFind,
  update,
  deleteAuthor,
  deleteBook,
}
