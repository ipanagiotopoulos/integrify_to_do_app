//importing modules
const express = require('express')
const userController = require('../controllers/userController')
const { signup, login, changePassword} = userController
const userAuth = require('../Middlewares/userAuth')

const user_router = express.Router()


router.post('/signup', userAuth.saveUser, signup)
router.post('/signin', login)
router.put('/changepassword',changePassword)

module.exports = user_router