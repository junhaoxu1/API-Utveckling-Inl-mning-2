import express from 'express'
import { body } from 'express-validator'
import { index, show, store, storePhoto, update } from '../controllers/album_controller'
const router = express.Router()

router.get('/', index)

router.get('/:album_id', show)

router.post('/', [], store)

router.post('/:album_id/photos', [] , storePhoto)

router.patch('/:albumId', [], update)

export default router
