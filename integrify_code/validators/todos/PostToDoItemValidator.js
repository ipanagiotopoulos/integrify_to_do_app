const Joi = require('joi')

const toDoPostSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),
  description: Joi.string().min(10).max(5000).optional(),
  status: Joi.string().valid('NotStarted','OnGoing','Completed').required()
})

const toDoPostValidate = (req, res, next) => {
  const { error } = toDoPostSchema.validate(req.body, {
    abortEarly: false,
  })
  if (error) {
      return res.status(500).send(error)
  }
  else {
    next()
  }
}

module.exports = {
    toDoPostValidate
}