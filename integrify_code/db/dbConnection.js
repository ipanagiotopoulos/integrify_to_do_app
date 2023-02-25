const { Sequelize, DataTypes } = require('sequelize')


var dbUrl = process.env.db_url || 'postgres://postgres:123456@localhost:5433/todo_db'

const sequelize = new Sequelize(dbUrl, { dialect: 'postgres' })


sequelize.authenticate().then(() => {
    console.log('App connected to database')
}).catch((err) => {
    console.log(err)
})

const toDoAppDb = {}

toDoAppDb.Sequelize = Sequelize
toDoAppDb.sequelize = Sequelize


toDoAppDb.users = require('./models/User')(sequelize, DataTypes)
toDoAppDb.toDos = require('./models/ToDo')(sequelize, DataTypes)

module.exports = {
    toDoAppDb,
} 


