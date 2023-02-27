//importing modules
const express = require('express')
const userController = require('../controllers/userController')
const { userSignUpValidate } = require('../validators/users/SignUpUserValidator')
const { userLoginValidate } = require('../validators/users/LoginUserValidator')
const { userChangePasswordValidate } = require('../validators/users'
    +'/ChangePasswordValidator')
const { signup, login, changePassword} = userController
const { checkIfLoggedIn, saveUser } = require('../middleware/userAuth')


const user_router = express.Router()


user_router.post('/signup',userSignUpValidate, saveUser, signup)
user_router.post('/signin',userLoginValidate, login)
user_router.put('/changepassword', userChangePasswordValidate, checkIfLoggedIn,
    changePassword)

module.exports = user_router