const Joi = require('joi')

const updateToDoItemQueryParamSchema = Joi.object({
  id:Joi.number().required()
})

const updateToDoItemBodySchema = Joi.object({
  name: Joi.string().min(3).max(60),
  description: Joi.string().min(10).max(5000),
  status: Joi.string().valid('NotStarted','OnGoing','Completed')
})


const updateToDoValidate = (req, res, next) => {
  var { error } = updateToDoItemQueryParamSchema.validate(req.params, {
    abortEarly: false,
  })
  if (error) {
    return res.status(500).send({ message: 'Validation error', error: error })
  }
  var { error } = updateToDoItemBodySchema.validate(req.body, {
    abortEarly: false,
  })
  if (error) {
    return res.status(500).send({ message: 'Validation error', error: error })
  }
  next()
}

module.exports = {
    updateToDoValidate
}