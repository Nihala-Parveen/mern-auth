import express from 'express'
import { google, signIn, signUp } from '../controllers/authController.js'

const router = express.Router()

router.post("/signUp" , signUp )
router.post("/signIn" , signIn )
router.post("/google" , google)

export default router