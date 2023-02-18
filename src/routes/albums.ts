import express from 'express'
import { index, show, store, storePhoto, update } from '../controllers/album_controller'
const router = express.Router()

router.get('/', index)

router.get('/:album_id', show)

router.post('/', [], store)

router.post('/:album_id/photos', [] , storePhoto)

router.patch('/:album_id', [], update)

export default router
