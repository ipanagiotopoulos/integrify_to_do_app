const sequelize = require('sequelize')
const User = require('./User')
const DataTypes = sequelize.DataTypes


const ToDo = sequelize.define('todo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        EmptyResultError:true
    },
    description: {
        type: DataTypes.TEXT(5000)
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        EmptyResultError:true
    },
    status: {
        type: DataTypes.ENUM('NotStarted', 'OnGoing', 'Completed'), 
        allowNull: false,
        EmptyResultError:true
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        EmptyResultError:true
    },
    updated: {
        type: DataTypes.DATE,
        allowNull: false,
        EmptyResultError:true
    }
    }, { timestamps: true })
    

ToDo.belongsTo(User, { foreignKey: 'id', as: 'userId' })
module.exports = {
    ToDo
}
