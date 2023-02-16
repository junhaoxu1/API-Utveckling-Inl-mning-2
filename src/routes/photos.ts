import express from 'express'
import { body } from 'express-validator'
import { getPhotos } from '../controllers/photo_controller'
import { index, show, store, update } from '../controllers/_controller'
import { validateToken } from '../middlewares/auth/jwt'
const router = express.Router()

router.get('/', getPhotos)

router.get('/:resourceId', show)

router.post('/', [], store)

router.patch('/:resourceId', [], update)

export default router
