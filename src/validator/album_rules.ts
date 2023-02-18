import { body } from 'express-validator'

export const createAlbumRules = [
    body('title')
    .isString().withMessage("Not a String")
    .bail()
    .isLength({min: 1}),
]