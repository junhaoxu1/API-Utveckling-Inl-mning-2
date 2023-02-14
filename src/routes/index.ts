import express from "express"
import resource from './_router'
import { register, login } from '../controllers/user_controller'
import { createUserRules } from "../validator/user_rules"

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

router.post('/register', createUserRules, register)

router.post('/login', login)


export default router
