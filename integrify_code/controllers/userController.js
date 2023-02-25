const bcrypt = require("bcrypt")
const { toDoAppDb } = require("../db/dbConnection")
const jwt = require("jsonwebtoken")


const User = toDoAppDb.users


const signup = async (req, res) => {
 try {
   const { userName, email, password } = req.body
   const data = {
     userName,
     email,
     password: await bcrypt.hash(password, 10),
   }
   const user = await User.create(data)
   if(!user) return res.status(409).send("Credentials are not correct")


   let token = jwt.sign({ id: user.id }, process.env.secretKey, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     })

    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true })
     
    console.log("user", JSON.stringify(user, null, 2))
    console.log(token)
     //send users details
    return res.status(201).send(user)
 } catch (error) {
   console.log(error)
 }
}



const login = async (req, res) => {
 try {
   const { email, password } = req.body
   const user = await User.findOne({
     where: {
     email: email
   } 
   })   
   if (!user) return res.status(401).send("Authentication failed")
     
   const isSame = await bcrypt.compare(password, user.password)
   if (!isSame)  return res.status(401).send("Authentication failed")

   let token = jwt.sign({ id: user.id }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       })
   res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true })
     
   console.log("user", JSON.stringify(user, null, 2))
   console.log(token)
     
   return res.status(201).send(user)     
 } catch (error) {
   console.log(error)
 }
}

const changePassword = async (req, res) => {
    return res.status(501).send("/api/v1/changepassword is not implemented")
}

module.exports = {
 signup,
 login,
}