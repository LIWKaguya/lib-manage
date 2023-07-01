import express from 'express'
import { checkAuth } from '../middlewares/extractor'
import {
  findAll,
  findById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/id/:authorId', findById)
router.post('/', checkAuth, createAuthor)
router.put('/id/:authorId', checkAuth, updateAuthor)
router.delete('/id/:authorId', checkAuth, deleteAuthor)

export default router
