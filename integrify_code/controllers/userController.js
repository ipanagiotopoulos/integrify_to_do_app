const bcrypt = require('bcrypt')
const { toDoAppDb } = require('../db/dbConnection')
const jwt = require('jsonwebtoken')


const User = toDoAppDb.users


const signup = async (req, res) => {
 try {
   const { id, email, password } = req.body
   const data = {
     id,
     email,
     password: await bcrypt.hash(password, 10),
     created: new Date(),
     updated: new Date()
  }

   const user = await User.create(data)
   if(!user) return res.status(409).send({message:'Credentials are not correct'})


   let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     })

    res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true })

    console.log('user', JSON.stringify(user, null, 2))
    console.log(token)
     //send users details
    return res.status(201).send(user)
 } catch (error) {
   console.log(error)
 }
}



const login = async (req, res) => {
  try {
    const { id, password } = req.body
    var user = await User.findOne({
      where: {
        id: id
      }
    })

    if (!user) {
      user  = await User.findOne({
         where: {
           email: id
         }
      })
      if (!user) return res.status(401).send({message:'Authentication failed'})
    }

   const isSame = await bcrypt.compare(password, user.password)
   if (!isSame)  return res.status(401).send({message:'Authentication failed'})

   let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
    })
   console.log('user', JSON.stringify(user, null, 2))
   console.log(token)
    const response = {
     message: 'The user ' + user.id + ' has succesfully logged in!',
     user: user,
     token: token
   }
    return res.status(201).send(response)
  } catch (error) {
    console.log(error)
    return res.status(500).send({message:'Unfortunately something went wrong'})
 }
}

const changePassword = async (req, res) => {
  const { id, password, newPassword1 } = req.body

  var user = await User.findOne({
      where: {
        id: id
      }
  })

  if (!user) {
    user  = await User.findOne({
        where: {
           email: id
         }
    })
    if (!user) return res.status(401).send({message:'Authentication failed'})
  }

  const isSame = await bcrypt.compare(password, user.password)
  if (!isSame) return res.status(401).send({ message: 'Authentication failed' })


  user.set({
    password: await bcrypt.hash(newPassword1, 10)
  })

  await user.save().then((newUser) => {
     return res.status(201).send({message: 'Password changed', user:newUser})
  }).catch((err) => {
    return res.status(201).send({
      message: 'Something went wrong.You can try'+
     'again later!'+err})
  })
}

module.exports = {
 signup,
 login,
 changePassword
}