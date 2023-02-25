//importing modules
const express = require('express')
const userController = require('../controllers/userController')
const { signup, login, changePassword} = userController
const userAuth = require('../Middlewares/userAuth')

const user_router = express.Router()


user_router.post('/signup', userAuth.saveUser, signup)
user_router.post('/signin', login)
user_router.put('/changepassword',changePassword)

module.exports = user_router