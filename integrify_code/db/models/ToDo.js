const {User} = require('../models/User')

module.exports = (sequelize, DataTypes) => {
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
   }, { timestamps: true })

    ToDo.associate = (models) => {
        ToDo.belongsTo(User, { foreignKey: 'id', as: 'userId' })
    }

   return ToDo
}
