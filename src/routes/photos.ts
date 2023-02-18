import express from 'express'
import { index, show, store, update } from '../controllers/photo_controller'
const router = express.Router()

router.get('/', index)

router.get('/:photo_id', show)

router.post('/', [], store)

router.patch('/:photo_id', [], update)

export default router
