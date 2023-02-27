const Joi = require('joi')

const deleteToDoItemVlidator = Joi.object({
  id:Joi.number().required()
})

const deleteToDoValidate = (req, res, next) => {
  const { error } = deleteToDoItemVlidator.validate(req.params, {
    abortEarly: false,
  })
  if (error) {
      return res.status(500).send(error)
  }

  next()
}

module.exports = {
    deleteToDoValidate
}