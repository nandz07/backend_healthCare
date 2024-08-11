import express from 'express'
import {adminLogin, getAllDoctors, setDoctroAprroved} from '../Controllers/adminController.js'
import { authenticate, restrict } from '../auth/verifyToken.js'
import { getAllUsers } from '../Controllers/userController.js'

const router=express.Router()

router.post('/adminLogin',adminLogin)
router.get('/patients',authenticate,restrict(["admin"]),getAllUsers)
router.get('/doctors',authenticate,restrict(["admin"]),getAllDoctors)
router.patch('/doctor-approve/:id',authenticate,restrict(["admin"]),setDoctroAprroved)

export default router