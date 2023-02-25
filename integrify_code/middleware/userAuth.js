const express = require("express")
const db = require("../../db")

const User =  db.users


 const saveUser = async (req, res, next) => {

 try {
   const username = await User.findOne({
     where: {
       userName: req.body.userName,
     },
   })

   if (username) {
     return res.json(409).send("username already taken")
   }

   const emailcheck = await User.findOne({
     where: {
       email: req.body.email,
     },
   })

   if (emailcheck) {
     return res.json(409).send("Authentication failed")
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