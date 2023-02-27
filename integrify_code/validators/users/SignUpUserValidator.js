const Joi = require('joi')

const userPostSchema = Joi.object({
    id: Joi.string().min(3).max(60).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
})

const userSignUpValidate = (req, res, next) => {
  const { error } = userPostSchema.validate(req.body, {
    abortEarly: false,
  })
    if (error) {
      return res.status(500).send(error)
  }
  next()
}

module.exports = {
    userSignUpValidate
}