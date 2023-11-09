const {DataTypes} = require("sequelize");  //Importa os tipos de dados do sequelize para setar no objeto

module.exports = (sequelize) =>{
    return sequelize.define('classroom',{
        class_tittle:{
            type:DataTypes.STRING,
            allowNull:false
        },
        class_url:{
            type:DataTypes.STRING,
            allowNull: false
        },
        class_description:{
            type:DataTypes.TEXT,
            allowNull: false
        }
    })
}