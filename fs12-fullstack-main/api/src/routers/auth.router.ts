import express from 'express'
import { googleAuthenticate } from '../middlewares/extractor'

import { googleLogin } from '../controllers/auth.controller'

const router = express.Router()

router.post('/google', googleAuthenticate, googleLogin)

export default router
