import express from 'express'
import { checkAuth } from '../middlewares/extractor'

import {
  findById,
  findAll,
  createBook,
  findByISBN,
  filterBook,
  updateDescription,
  borrowBook,
  returnBook,
  updateAuthors,
  deleteBook,
} from '../controllers/book.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/id/:bookId', findById)
router.get('/isbn/:ISBN', findByISBN)

router.get('/filter', filterBook)

router.post('/', checkAuth, createBook)
router.put('/:id/update/description', checkAuth, updateDescription)
router.put('/:id/update/authors', checkAuth, updateAuthors)
router.put('/:id/borrow', checkAuth, borrowBook)
router.put('/:id/return', checkAuth, returnBook)
router.delete('/:id', checkAuth, deleteBook)

export default router
