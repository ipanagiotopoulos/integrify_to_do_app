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
      return res.status(500).send({ message: 'Validation error', error: error })
  }
  next()
}

module.exports = {
    userLoginValidate
}