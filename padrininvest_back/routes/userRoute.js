const router = require('express').Router();
const routerTest = require('express').Router();
const routerResetPassword = require('express').Router();
const auth = require("./../auth");

const User = require('../controllers/userController');

module.exports = app =>{
    router.post('/createUser', User.createUser);
    router.post('/loginUser', User.loginUser);
    router.get('/validaToken', User.validarToken);
    router.post('/logoutUser', auth.autenticado, User.logoutUser);
    routerTest.get('/',(req,res,next)=>{res.status(200).send('PONG!')});
    routerResetPassword.post('/sendCode', User.sendResetPasswordCode);
    routerResetPassword.post('/validateCode', User.validateResetCode);
    routerResetPassword.post('/resetPassword', User.resetPassword);
    app.use('/', routerTest);
    app.use('/api/user', router);
    app.use('/api/user/passwordReset', routerResetPassword);
}