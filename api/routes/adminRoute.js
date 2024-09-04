import express from 'express'
import { addUser, adminHome, adminLogin, adminLogout, deleteUser, editUser, userEdit } from '../controllers/adminController.js'
import { verifyToken } from '../utils/verifyAdmin.js'

const router = express.Router()

router.post('/login' , adminLogin)
router.get('/home' , verifyToken , adminHome )
router.get('/logout' , adminLogout)
router.post('/addUser' , verifyToken , addUser)
router.get('/editUser/:id' , verifyToken , editUser )
router.post('/editUser/:id' , userEdit )
router.get('/deleteUser/:id' , deleteUser )

export default router