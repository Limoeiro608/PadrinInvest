const jwt = require('jsonwebtoken');
const authConfig = require('./../config').auth;
const blackList =  require('./../controllers/blackListController');

exports.assinatura = (id,fullName) =>{
    if(id && fullName){
        const token = jwt.sign({id,fullName},authConfig.secret_key, {expiresIn:authConfig.timer});
        return token;
    }else{
        return false;
    }
    
}
const validaToken = async (token) =>{
    try{
        const locBlackList = await blackList.toLocateToken(token);
        if(!locBlackList){
        const decode = jwt.verify(token, authConfig.secret_key);
        if(decode){
            return {
                valid: true,  //Retorna que o token é valido
                fullName: decode.fullName,  //Retorna o payload do token (não necessário)
                id: decode.id
            }
        }else{
            return {
                valid: false,
                fullName: undefined,
                id: undefined
            }
        }
    }else{
            return {
                valid: false,
                fullName: undefined,
                id: undefined
            }
        }
    }catch(e){
        return {
            valid: false,
            fullName: undefined,
            id: undefined
        }
    }   
}

exports.validaToken = validaToken;

exports.autenticado = async (req, res, next) =>{
    const result = await validaToken(req.headers.authorization)
    if(result.valid){
        res.locals.id=result.id;
        next();
    }else{
        res.status(401).send("Não autorizado");
    }
}

exports.validaTokenBL = (token) =>{
    try{
        const decode = jwt.verify(token, authConfig.secret_key);
        if(decode){
            return {
                valid: true,  //Retorna que o token é valido
                id: decode.id  //Retorna o payload do token (não necessário)
            }
        }else{
            return {
                valid: false,
                id: undefined
            }
        }
    }catch(e){
        return {
            valid: false,
            id: undefined
        }
    }   
}