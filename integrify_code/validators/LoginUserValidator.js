const Joi = require('joi')

const userLoginPostSchema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().min(6).max(50).required(),
})


const userLoginValidate = (req, res, next) => {
  const { error } = userLoginPostSchema.validate(req.body, {
    abortEarly: false,
  })
    if (error) {
      res.status(500).send(error)
  }
  next()
}


module.exports = {
    userLoginValidate
}