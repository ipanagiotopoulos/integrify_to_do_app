const Joi = require('joi')

const getToDoItemVlidator = Joi.object({
  status:Joi.string().valid('NotStarted','OnGoing','Completed')
})

const getToDoValidate = (req, res, next) => {
  const { error } = getToDoItemVlidator.validate(req.query, {
    abortEarly: false,
  })
    if (error) {
      return res.status(500).send(error)
  }
  next()
}

module.exports = {
    getToDoValidate
}