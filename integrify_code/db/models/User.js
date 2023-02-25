const sequelize = require("sequelize")
const DataTypes = sequelize.DataTypes

console.log("test", sequelize)
const User =  sequelize.define("user", {
    id: {
        type: DataTypes.STRING(60),
        primaryKey: true,
        EmptyResultError:true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        EmptyResultError:true
    },
    password: {
        type: DataTypes.STRING,
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

module.exports = {
    User
}



