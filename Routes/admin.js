import express from 'express'
import {adminLogin} from '../Controllers/adminController.js'
import { authenticate, restrict } from '../auth/verifyToken.js'
import { getAllDoctor } from '../Controllers/doctorController.js'
import { getAllUsers } from '../Controllers/userController.js'

const router=express.Router()

router.post('/adminLogin',adminLogin)
router.get('/patients',authenticate,restrict(["admin"]),getAllUsers)
router.get('/doctors',authenticate,restrict(["admin"]),getAllDoctor)

export default router