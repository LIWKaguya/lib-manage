import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import bookService from '../services/book.service'
import { CustomRequest } from '../types'
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from '../helpers/apiError'
import { CustomFilterQuery } from '../types'
import userService from '../services/user.service'
import authorService from '../services/author.service'
import { AuthorDocument } from '../models/Author'
import mongoose, { Types } from 'mongoose'

export const findAll = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await bookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const updateAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req
    if (!user.isAdmin) throw new ForbiddenError()

    const { names } = req.body
    const { id } = req.params
    const foundBook = await bookService.findById(id)
    if (!foundBook) throw new BadRequestError()

    const authors: AuthorDocument[] = await Promise.all(
      names.map((name: string) => {
        return authorService.findByProperties({ name })
      })
    )

    const authorsId: Types.ObjectId[] = authors.map((author) => author._id)

    const bookIdString: string = foundBook._id
    const bookId: Types.ObjectId = foundBook._id

    const newBook = { authors: [...foundBook.authors, ...authorsId] }
    const newAuthors = authors.map((author) => {
      return {
        id: author._id,
        books: [...author.books, bookId],
      }
    })

    const updatedBook = await bookService.update(bookIdString, newBook)
    await Promise.all(
      newAuthors.map((book) => {
        return authorService.update(book.id, { books: book.books })
      })
    )
    res.status(200).json(updatedBook)
  } catch (error) {
    next(error)
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await bookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const findByISBN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await bookService.findByISBN(req.params.ISBN))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const filterBook = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req
    const dbQuery: Partial<CustomFilterQuery> = {}
    for (const key in query) {
      if (key === 'title') {
        const re = new RegExp(query[key]!, 'i')
        dbQuery.title = { $regex: re }
      }
      if (key === 'status') {
        dbQuery.status = query[key]
      }
      if (key === 'authors') {
        dbQuery.authors = { $all: query[key]?.split(',') }
      }
      if (key === 'categories') {
        dbQuery.categories = { $all: query[key]?.split(',') }
      }
    }
    res.json(await bookService.customFind(dbQuery))
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ISBN, title, description, publisher, publishedYear, categories } =
      req.body

    const book = new Book({
      ISBN,
      title,
      description,
      publisher,
      publishedYear,
      categories,
    })

    await bookService.create(book)

    res.status(201).json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const updateDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req
    if (!user.isAdmin) throw new ForbiddenError()
    const { id } = req.params
    const { description } = req.body
    const updatedBook = await bookService.update(id, { description })
    res.json(updatedBook)
  } catch (error) {
    next(error)
  }
}

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req
    if (!user) throw new UnauthorizedError()

    console.log(user)

    const bookId = req.params.id
    const { userId } = user

    console.log({ bookId, userId })

    const userfindById = await userService.findById(userId)
    const bookFindById = await bookService.findById(bookId)

    if (bookFindById.status === 'borrowed') throw new BadRequestError()

    const borrowedBook = {
      status: 'borrowed',
      borrowedId: userId,
      borrowedDate: [...bookFindById.borrowedDate, new Date()],
    }

    const borrowUser = {
      borrowedBooks: [
        ...userfindById.borrowedBooks,
        new mongoose.Types.ObjectId(bookId),
      ],
    }

    const updatedBook = await bookService.update(bookId, borrowedBook)
    await userService.update(userId, borrowUser)

    res.json(updatedBook)
  } catch (error) {
    next(error)
  }
}

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req
    if (!user) throw new UnauthorizedError()

    const bookId = req.params.id
    const { userId } = user

    const userfindById = await userService.findById(userId)
    const bookFindById = await bookService.findById(bookId)

    if (bookFindById.status === 'available') throw new BadRequestError()

    const returnedBook = {
      borrowedId: null,
      status: 'available',
      returnedDate: [...bookFindById.returnedDate, new Date()],
    }

    const returnUser = {
      borrowedBooks: userfindById.borrowedBooks.filter(
        (id) => id !== bookFindById._id
      ),
    }

    await userService.update(userId, returnUser)
    const updatedBook = await bookService.update(bookId, returnedBook)

    res.json(updatedBook)
  } catch (error) {
    next(error)
  }
}

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req
    if (!user.isAdmin) throw new ForbiddenError()
    const { id } = req.params
    await bookService.deleteBook(id)
    await authorService.deleteBook(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
