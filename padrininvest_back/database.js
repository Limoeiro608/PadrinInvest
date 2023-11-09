const DBCONFIG = require('./config').database;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
DBCONFIG.database,
DBCONFIG.username,
DBCONFIG.password,
{
    host: DBCONFIG.host,
    dialect: DBCONFIG.dialect
}
);
sequelize.authenticate().then(() => {
    console.log('Autenticado com sucesso no banco de dados!');
    }).catch((e)=>{
    console.log('Erro de autenticação com o banco de dados: ',e);
    })

module.exports = sequelize;