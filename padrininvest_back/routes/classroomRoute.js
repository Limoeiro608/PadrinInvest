const routerClassroom = require('express').Router();
const auth = require("./../auth");

const Classroom = require('../controllers/classroomController');

module.exports = app =>{
//routerClassroom.post('/createClassroom', auth.autenticado, Classroom.createClassroom);
routerClassroom.post('/returnClassroom', auth.autenticado, Classroom.returnClassroom);
routerClassroom.post('/relationUserClassroom', auth.autenticado, Classroom.relationUserClassroom);
routerClassroom.post('/classroomPerUser', auth.autenticado, Classroom.classroomPerUser);
app.use('/api/classroom', routerClassroom);
}