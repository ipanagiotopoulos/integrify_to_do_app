const { Sequelize, DataTypes } = require('sequelize')

var dbConnectionString = process.env.DATABASE_TYPE + '://' + process.env.DATABASE_USER
    + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_HOST +
    ':' + process.env.DATABASE_PORT + '/'+ process.env.DATABASE_NAME

console.log(`Logging into database with connection string ${dbConnectionString}`)

const sequelize = new Sequelize(dbConnectionString, { dialect: 'postgres' })

sequelize.authenticate().then(() => {
    console.log('App connected to database')
}).catch((err) => {
    console.log(err)
})

const toDoAppDb = {}

toDoAppDb.Sequelize = Sequelize
toDoAppDb.sequelize = sequelize

toDoAppDb.users = require('./models/User')(sequelize, DataTypes)
toDoAppDb.toDos = require('./models/ToDo')(sequelize, DataTypes)

sequelize.sync()
module.exports = {
    toDoAppDb
}


