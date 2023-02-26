module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('user', {
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
    }
}, { timestamps: true })
   return User
}