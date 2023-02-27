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
  const bodyValidationError = validateBody(req.body)
  if (!bodyValidationError) return res.status(500)
    .send({ message: 'Validation error', error: bodyValidationError })
  next()
}

const validateBody = (body)=>{
  var { error } = updateToDoItemBodySchema.validate(body, {
    abortEarly: false,
  })
  return error?error:null
}

module.exports = {
    updateToDoValidate
}