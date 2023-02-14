import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update } from '../controllers/_controller'
const router = express.Router()

router.get('/', index)

router.get('/:album_id', show)

router.post('/', [], store)

router.patch('/:album_id', [], update)

export default router
