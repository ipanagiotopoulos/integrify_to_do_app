//const express = require('express')
const {toDoAppDb} = require('../db/dbConnection')

const User =  toDoAppDb.users


const saveUser = async (req, res, next) => {
 var requestId = req.body.id
 var requestEmail = req.body.email
 try {
   const id = await User.findOne({
     where: {
       id: requestId,
     },
   })

   if (id) {
     console.log('user check')
     return res.status(409).send({ message:'The id '+requestId+' has been already taken'})
   }

   const emailcheck = await User.findOne({
     where: {
       email: requestEmail,
     },
   })

   if (emailcheck) {
     console.log('email check')
     return res.status(409).send({ message:'The email'+requestEmail+
     ' has been already used'})
   }
   next()
 } catch (error) {
   console.log(error)
 }
 }

//not implemented
const updateUser = async (req, res, next) => {
    next()
}


module.exports = {
    saveUser,
    updateUser
}