//const express = require('express')
const { toDoAppDb } = require('../db/dbConnection')
const jwt = require('jsonwebtoken')

const User = toDoAppDb.users

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

const checkIfLoggedIn = async (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) return res.status(403).send({ message: 'Not authorized for this action' })
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    console.log('decoded token', decodedToken)
    const user = await User.findOne({
      where: {
       id: decodedToken.id,
     }
    })
    if(!user) return res.status(401).send({ message: 'User does not  exist' })
    req.id = decodedToken.id
  }
  catch (err) {
    console.log(err)
    return res.status(401).send({message:'Invalid token'})
  }
  return next()
}

module.exports = {
  saveUser,
  checkIfLoggedIn
}