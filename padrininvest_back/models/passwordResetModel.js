const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('passwordReset',{
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"users",
                key:"id"
            }
        }
    })
}