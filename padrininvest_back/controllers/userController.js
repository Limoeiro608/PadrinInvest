const Model = require('./../models').user;      
const bcrypt = require('bcrypt')
const adminConfig = require('./../config').admin;
const auth = require('./../auth');
const blackList =  require('./blackListController');
const passwordReset = require('./passwordResetController');


exports.createAdmin = async () => {
    const hash = await bcrypt.hash(adminConfig.password, 6);
    Model.findOrCreate({   
        where: {    
            id: 1
        },
        defaults: { 
            fullName: adminConfig.fullName,
            email: adminConfig.email,
            password: hash
        }
    }).then((result) => {
        if (result[1]) {     
            console.log('Registro padrão criado com sucesso!');
        } else {             
            console.log('Registro padrão já criado!');
        }
    }).catch((e) => {
        console.error('Erro na função createAdmin do model userController: ', e);
    });
}

/*----------------------------------------------------------------*/
exports.createUser = async (req,res,next) =>{
    if(req.body){                       //valida se há corpo na requisição
        if(req.body.fullName && req.body.email && req.body.password){           //valida se no corpo da requisição existe o nome completo, o e-mail e a senha
            try{
            const emailVerify = await Model.findOne({   //armazena em uma constante o e-mail contido no corpo da requisição caso ele existe no banco
                where:{
                    email: req.body.email
                }
            })
            if(emailVerify){ //retorna para o front uma resposta caso o e-mail exista
                res.status(400).json({sucess:false,reason:'Email already in use.'})
            }else{            //continua o programa caso não exista no banco
                const hash = await bcrypt.hash(req.body.password,6); //Criptografa a senha com bycrypt e 6 rounds de sal
                console.log(hash);
                const result = await Model.findOrCreate({ //busca novamente um registro no banco com o e-mail da requisição, caso não exista, cria um novo com as informações do corpo da requisição e adiciona a senha como a variavel hash criada acima
                    where:{
                        email:req.body.email
                    },
                    defaults:{
                        fullName:req.body.fullName,
                        email:req.body.email,
                        password:hash
                    }
                }); 
                if (result[1]) {     
                    console.log('Registro de usuário criado com sucesso!');
                    res.status(200).json({
                        sucess:true,
                    });
                } else {             
                    console.log('Registro de usuário já criado!');
                }
            }
        }catch(e){
            console.log('ATENÇÃO! Formato de e-mail inválido');
            res.status(401).json({sucess: true, reason:'Formato de e-mail inválido'});
        }
        }else{
            res.status(400).json({ sucess: false, reason: 'Missing Data' });
        }
    }else{
        res.status(400).json({ sucess: false, reason: 'Missing Data' });
    }
}
/*----------------------------------------------------------------*/

exports.loginUser = async (req, res, next) => {        
    if (req.body) {  //valida se há corpo na requisição
        if (req.body.email && req.body.password) { //valida se no corpo da requisição existe o e-mail e a senha
            const stored_user = await Model.findOne({ where: { email: req.body.email } }); //localiza o registro no banco utilizando o e-mail para a busca
            if (!stored_user) { //caso não localize, retorna uma resposta ao front informando que o usuário não foi encontrado
                res.status(200).json({ sucess: false, reason: 'User not found' })
            } else {
                    const comparation = await bcrypt.compare(req.body.password, stored_user.password); //compara a senha informada no corpo da requisição com a senha criptografada atrelada ao usuário que foi localizado através do e-mail
                    if(comparation){
                        const jwt = auth.assinatura(stored_user.id,stored_user.fullName); //assina um token para esse login
                        res.status(200).json({  //retorna ao front que o login foi efetuado com sucesso e o token assinado
                            sucess:true,
                            token: jwt
                        });
                    }else{
                        res.status(401).json({sucess:false, reason: 'Senha inválida'})
                    }
            }
        } else {
            res.status(400).json({ sucess: false, reason: 'Missing Data' });
        }
    } else {
        res.status(400).json({ sucess: false, reason: 'Missing Data' });
    }
}

/*----------------------------------------------------------------*/
exports.validarToken = async (req, res, next) =>{
    const token = req.headers.authorization  //armazena o token inserido no cabeçalho da requisição em uma constante
    if(!token){ //verifica se a constante está vazia
        res.status(400).json({sucess: false, reason: 'Token invalido'});
    }else{
        const tokenValido = await auth.validaToken(token);
        res.status(200).json({sucess: true, valid: tokenValido.valid, fullName: tokenValido.fullName, id:tokenValido.id});
    }
}

/*----------------------------------------------------------------*/
exports.logoutUser = async (req,res,next) =>{
    res.status(200).json({sucess: await blackList.insertToken(req.headers.authorization)});
}

exports.sendResetPasswordCode = async (req, res, next) => {
    if(req.body){
        if(req.body.userMail){
            const userData = await Model.findOne({
                where: {
                    email: req.body.userMail
                }
            })
            if(userData){
                if(userData.id){
                    console.log(userData.id);
                    const sendCode = await passwordReset.sendResetCode(userData.id, userData.email);
                    res.status(200).json(sendCode);
                }else{
                    res.status(400).json({sucess: false, reason: 'User not found'});
                }
            }else{
                res.status(400).json({sucess: false, reason: 'User not found'});
            }
        }else{
            res.status(400).json({sucess: false, reason: 'Missing data.'});
        }
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data.'});
    }
}

exports.validateResetCode = async (req, res, next) => {
    if(req.body){
        if(req.body.code){
            const codeResult = (await passwordReset.checkCode(req.body.code));
            res.status(200).json({sucess: true, valid: codeResult.sucess});
        }else{
            console.log('primeiro else');
            res.status(400).json({sucess: false, reason: 'Missing data.'});
        }
    }else{
        console.log('segundo else');
        res.status(400).json({sucess: false, reason: 'Missing data.'});
    }
}

exports.resetPassword = async (req, res, next) => {
    if(req.body){
        if(req.body.code && req.body.newPassword){
            const codeValidation = await passwordReset.validateCode(req.body.code);
            if(codeValidation.sucess){
                const hash = await bcrypt.hash(req.body.newPassword, 6);       //Criptografa a senha com bycrypt e 6 rounds de sal
                await Model.update({
                    password: hash
                },
                {
                    where: {
                        id: codeValidation.userId
                    }
                });
                res.status(200).json({sucess: true});
            }else{
                res.status(400).json({sucess: false, reason: 'Invalid or expired code.'})
            }
        }else{
            res.status(400).json({sucess: false, reason: 'Missing data'});
        }
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data'});
    }
}