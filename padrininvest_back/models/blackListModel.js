const {DataTypes} = require("sequelize");  //Importa os tipos de dados do sequelize para setar no objeto

module.exports = (sequelize) =>{
    return sequelize.define('blackList',{
        token:{
            type:DataTypes.STRING,
            allowNull: false
        }
    })
}