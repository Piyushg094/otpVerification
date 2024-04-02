require('dotenv').config()
const userController = require('../controllers/userController')
const express=require('express')
const router =express();

router.use(express.json());

router.post('/send-otp', userController.sendOtp)

module.exports = router