const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express()
require('dotenv').config()

const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))

const userRoutes = require('./routes/auth')
const toDoRoutes = require('./routes/todos')

const baseApiEndpoint = (process.env.BASE_API_ENDPOINT || '/api') +
    (process.env.BASE_API_VERSION || '/v1')

app.use(baseApiEndpoint, userRoutes)
app.use(baseApiEndpoint, toDoRoutes)
app.use(baseApiEndpoint + '/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use((req, res) => {
    res.status(404).json({success:false, message: 'Resource not found.'})
})

app.listen(port, () =>{`Server started on port ${port}`})
