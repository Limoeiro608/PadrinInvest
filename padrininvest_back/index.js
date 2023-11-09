const express = require('express');
const apiConfig = require('./config').api;
const cors = require('cors');
const certsConfig = require('./config').certs;
const app = express();
const https = require('https');
const fs = require('fs');

const db = require('./models');

app.use(express.json());
app.use(cors());

const startApiServer = () =>{
    console.log(`Servidor de API inicializado na porta ${(apiConfig.useHttps)?apiConfig.ports.https:apiConfig.ports.http}.`);
}

db.sequelize.sync({force: false}).then(()=>{              //Sincroniza os modelos da configuração com o banco de dados.
    //Se for adicionado {force: true} dentro da função sync, o sequelize irá dropar as tabelas do modelo e criar todas novamente
console.log('Banco de dados sincronizado.');
require('./controllers/userController').createAdmin();
require('./controllers/courseController').createCourseOne();
require('./controllers/courseController').createCourseTwo();
require('./controllers/classroomController').createClassroomOne();
require('./controllers/classroomController').createClassroomTwo();
require('./controllers/classroomController').createClassroomThree();
require('./controllers/classroomController').createClassroomFour();
require('./controllers/classroomController').createClassroomFive();
require('./controllers/classroomController').createClassroomSix();
require('./controllers/classroomController').createClassroomSeven();
require('./controllers/classroomController').createClassroomEight();
require('./controllers/classroomController').createClassroomNine();
require('./controllers/classroomController').createClassroomTen();
require('./controllers/classroomController').createClassroomEleven();
require('./controllers/classroomController').createClassroomTwelve();
require('./controllers/classroomController').createClassroomThirteen();
require('./controllers/classroomController').createClassroomFourteen();
require('./controllers/classroomController').createClassroomFiveteen();
require('./controllers/classroomController').createClassroomSixteen();
require('./controllers/classroomController').createClassroomSeventeen();
require('./controllers/classroomController').createClassroomEighteen();
require('./controllers/classroomController').createClassroomNineteen();
require('./controllers/classroomController').createClassroomTwenty();
require('./controllers/classroomController').createClassroomTwentyOne();
require('./controllers/classroomController').createClassroomTwentyTwo();
require('./controllers/classroomController').createClassroomTwentyThree();
require('./controllers/classroomController').createClassroomTwentyFour();
require('./controllers/classroomController').createClassroomTwentyFive();
}).catch((e)=>{
console.log('Erro ao sincronizar o banco de dados: ',e);
})

require('./routes/userRoute')(app); 
require('./routes/classroomRoute')(app);
require('./routes/stockRoute')(app);
require('./routes/courseRoute')(app);

// if(apiConfig.useHttps){
//     try{
//         https.createServer(
//             {
//                 key:fs.readFileSync(`certs/${certsConfig.key}`),
//                 cert:fs.readFileSync(`certs/${certsConfig.cert}`),
//             },
//             app
//         ).listen(apiConfig.ports.https,startApiServer);
//     }catch(e){
//         console.log('Erro ao iniciar aplicação via HTTPS');
//         console.log(e);
//     }
// }else{
    app.listen(apiConfig.ports.http,startApiServer);
// }


module.exports = app;