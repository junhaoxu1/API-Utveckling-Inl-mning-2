/**
 * Validation Rules for User resource
 */
import { body } from 'express-validator'
import { getUserByEmail } from '../services/user_service'

export const createUserRules = [
	body('first_name').isString().bail().isLength({ min: 3 }),
	body('last_name').isString().bail().isLength({ min: 1 }),
	body('email').isEmail().custom(async (value: string) => {
		const user = await getUserByEmail(value)

		if (user) {
			return Promise.reject("Email already exists")
		}
	}),
	body('password').isString().bail().isLength({ min: 6 }),
]
