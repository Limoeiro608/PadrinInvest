const routerCourse = require('express').Router();
const auth = require("./../auth");

const Course = require('../controllers/courseController');

module.exports = app =>{
routerCourse.post('/returnClassroomPerCourse', auth.autenticado, Course.returnClassroomPerCourse);
app.use('/api/course', routerCourse);
}