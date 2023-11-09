const {DataTypes} = require("sequelize");  //Importa os tipos de dados do sequelize para setar no objeto

module.exports = (sequelize) =>{
    return sequelize.define('user',{
        fullName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        }
    })
}