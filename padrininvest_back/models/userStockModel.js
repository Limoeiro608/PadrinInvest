const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>{
    return sequelize.define('userStock',{
        valorPago:{
            type: DataTypes.FLOAT,
            allowNull: true
        },
        cotacao:{
            type: DataTypes.FLOAT,
            allowNull: true
        },
        stock:{
            type: DataTypes.STRING,
            allowNull: false,
            set(valor){
                this.setDataValue('stock',valor.toUpperCase())
            }
        },
        date:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}