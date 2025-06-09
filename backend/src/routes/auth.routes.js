import express from 'express';
import { login, signup, logout, checkAuth,updateimage } from '../controllers/auth.controller.js';
import { islogged } from '../middleware/auth.middleware.js';
const router= express.Router();



router.post('/login',login)
router.post('/signup',signup)
router.post('/logout',logout)
router.put('/updateimage',islogged,updateimage)
router.get('/check',islogged,checkAuth)
export default router;