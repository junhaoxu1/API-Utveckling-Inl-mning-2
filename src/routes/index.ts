import express from "express"
import { register, login } from '../controllers/user_controller'
import { createUserRules } from "../validator/user_rules"

const router = express.Router()

router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

router.post('/register', createUserRules, register)

router.post('/login', login)


export default router
