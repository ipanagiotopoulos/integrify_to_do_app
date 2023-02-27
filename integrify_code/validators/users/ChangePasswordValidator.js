const Joi = require('joi')

const userChangePasswordPutSchema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().min(6).max(50).required(),
    newPassword1: Joi.string().min(6).max(50).required(),
    newPassword2: Joi.string().min(6).max(50).required()
})

const userChangePasswordValidate = (req, res, next) => {
  const { error } = userChangePasswordPutSchema.validate(req.body, {
    abortEarly: false,
  })
  if (error) {
      return res.status(500).send(error)
  }
  const {newPassword1, newPassword2} = req.body
  if (newPassword1 !== newPassword2) {
    return res.status(400).send({
      message: 'Validation error',
      error: 'newPassword1 and newPassword2 should be the same'
    })
  }
  next()
}

module.exports = {
    userChangePasswordValidate
}

