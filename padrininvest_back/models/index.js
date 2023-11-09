const sequelize = require('./../database')          //Importa a conexão do banco de dados
module.exports.sequelize = sequelize;               //Exporta a conexão para a utilização dos models

/* Exportação dos models */
const user = require('./userModel')(sequelize);
const classroom = require('./classroomModel')(sequelize);
const userClassroom = require('./userClassroomModel')(sequelize);
const userStock = require('./userStockModel')(sequelize);
const course = require('./courseModel')(sequelize);

user.belongsToMany(classroom, {through: userClassroom});
classroom.belongsToMany(user, {through: userClassroom});

classroom.belongsTo(course);
userStock.belongsTo(user);

module.exports.user = user;    //Obtém e exporta o modelo com o nome "user", para utilização nos controllers
module.exports.blackList = require('./blackListModel')(sequelize);
module.exports.passwordReset = require('./passwordResetModel')(sequelize);
module.exports.classroom = classroom;
module.exports.userClassroom = userClassroom;
module.exports.userStock = userStock;
module.exports.course = course;