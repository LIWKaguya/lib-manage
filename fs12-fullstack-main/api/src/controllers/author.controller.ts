import { Request, Response, NextFunction } from 'express'

import Author from '../models/Author'
import authorService from '../services/author.service'
import { BadRequestError, ForbiddenError } from '../helpers/apiError'
import bookService from '../services/book.service'

type updatedAuthorInfo = {
  yearOfBirth: number
  description: string
}

export const findAll = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await authorService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await authorService.findById(req.params.authorId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, yearOfBirth } = req.body

    const newAuthor = new Author({
      name,
      description,
      yearOfBirth,
    })

    await authorService.create(newAuthor)

    res.status(201).json(newAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req
    if (!user.isAdmin) throw new ForbiddenError()
    const { authorId } = req.params
    const updatedInfo: Partial<updatedAuthorInfo> = {}
    const { description, yearOfBirth } = req.body
    if (description) updatedInfo['description'] = description
    if (yearOfBirth) updatedInfo['yearOfBirth'] = yearOfBirth

    const foundAuthor = await Author.findById(authorId)
    if (!foundAuthor) throw new BadRequestError()

    const updatedAuthor = await authorService.update(authorId, updatedInfo)

    res.status(200).json(updatedAuthor)
  } catch (error) {
    next(error)
  }
}

export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req
    if (!user.isAdmin) throw new ForbiddenError()
    const { authorId } = req.params
    await bookService.deleteAuthor(authorId)
    await authorService.deleteAuthor(authorId)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
