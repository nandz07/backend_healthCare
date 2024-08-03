import express from 'express'
import {adminLogin} from '../Controllers/adminController.js'

const router=express.Router()

router.post('/adminLogin',adminLogin)

export default router