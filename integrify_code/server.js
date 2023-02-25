const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const app = express()

const port = process.env.PORT || 8080

require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(morgan('dev'))

const userRoutes = require('./controllers/userController')
const toDoRoutes = require('./routes/todos')

const baseApiEndpoint = process.env.BASE_API_ENDPOINT || 'api'
    + process.env.BASE_API_VERSION || 'v1'
app.use(baseApiEndpoint, userRoutes)
app.use(baseApiEndpoint, toDoRoutes)

app.use((req, res) => {
    res.status(404).json({success:false, message: 'Resource not found.'})
})


app.listen(port, () =>{`Server started on port ${port}`})
