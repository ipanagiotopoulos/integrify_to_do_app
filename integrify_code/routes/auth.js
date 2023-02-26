//importing modules
const express = require('express')
const userController = require('../controllers/userController')
const { userSignUpValidate } = require('../validators/SignUpUserValidator')
const { signup, login, changePassword} = userController
const userAuth = require('../middleware/userAuth')
const { userLoginValidate } = require('../validators/LoginUserValidator')

const user_router = express.Router()


user_router.post('/signup',userSignUpValidate, userAuth.saveUser, signup)
user_router.post('/signin',userLoginValidate, login)
user_router.put('/changepassword',changePassword)

module.exports = user_router