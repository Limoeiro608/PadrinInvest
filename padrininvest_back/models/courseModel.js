const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>{
    return sequelize.define('course',{
        course_tittle:{
            type:DataTypes.STRING,
            allowNull:false
        },
        course_description:{
            type:DataTypes.TEXT,
            allowNull:false
        },
    });
}