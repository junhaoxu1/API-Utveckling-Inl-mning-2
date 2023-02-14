import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update } from '../controllers/_controller'
const router = express.Router()

router.get('/', index)

router.get('/:resourceId', show)

router.post('/', [], store)

router.patch('/:resourceId', [], update)

export default router
