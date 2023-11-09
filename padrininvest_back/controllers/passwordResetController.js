const Model = require('./../models').passwordReset;
const config = require('./../config').passwordReset;
const mailer = require('./../mail');
const { user } = require('./../models');

const generateRandomCode = ()=>{
    let code = "";
    for(var i = 1; i<=config.resetCodeLength; i++){
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

module.exports.sendResetCode = async (id, userMail)=>{
    if(id && userMail){
        let result = await Model.findOne({
            where: {
                id : id
            }
        });
        if(result != null){
            await Model.destroy({
                where: {
                    id : result.id
                }
            });                                         //Caso já exista um código pro usuário, esse código é excluido
        }
        let newCode = "";
        let loopEscape = false;
        while(!loopEscape){                     //Roda um loop infinito até que consiga um código que não esteja sendo usado, para impossibilitar código repetido
            const codeTry = generateRandomCode();
            const r = await Model.findOne({
                where: {
                    code: codeTry
                }
            });     
            if(r === null){                  //Caso o código gerado não seja encontrado no banco de dados, o loop é liberado
                newCode = codeTry;
                loopEscape = true;
            }
        }
        var expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes()+config.codeExpiration);   //Adiciona em minutos o tempo de expiração do código
        const cResult = await Model.create({
            code: newCode,
            userId: Number(id),
            expiration: `${new Date().getFullYear()}-${escapeDateValue(Number(expirationDate.getMonth())+1)}-${escapeDateValue(expirationDate.getDate())}T${escapeDateValue(expirationDate.getHours())}:${escapeDateValue(expirationDate.getMinutes())}:${escapeDateValue(expirationDate.getSeconds())}`
        });
        if(cResult.id){
            try{
                const mailRet = await mailer.sendMail(userMail, config.resetMailSubject, {
                    VALIDATION_CODE : newCode
                }, 'resetPasswordCode');
                return {sucess_code: true, sucess_mail: (mailRet[0] == userMail)};
            }catch(e){
                console.log(e)
                console.log('ATENÇÃO! Erro ao enviar email de reset de senha!');
                return {sucess: true, mailId: undefined}
            }
        }

    }
    return {sucess: false};
}

module.exports.checkCode = async (code) => {
    if(code){                                       //Valida se recebeu um codigo
        const dbResult = await Model.findOne({          //Busca no banco se o código foi salvo e está ativo
            where: {
                code
            }
        });
        if(dbResult === null){               
            return {sucess: false, reason: 'notSaved'}    //Caso o codigo nao esteja salvo, ele retorna esse erro 
        }else{   
            if((new Date(dbResult.expiration) > new Date())){    //Valida se o código fornecido não está expirado
                return {sucess: true, id: dbResult.id}
            }else{
                return {sucess: false, reason: 'expiredCode'}
            }
        }
    }else{
        return {sucess: false, reason: 'noCode'}
    }
}

module.exports.validateCode = async (code) => {
    if(code){                                       //Valida se recebeu um codigo
        const dbResult = await Model.findOne({          //Busca no banco se o código foi salvo e está ativo
            where: {
                code
            }
        });
        if(dbResult === null){               
            return {sucess: false, reason: 'notSaved'}    //Caso o codigo nao esteja salvo, ele retorna esse erro 
        }else{   
            if((new Date(dbResult.expiration) > new Date())){    //Valida se o código fornecido não está expirado
                Model.destroy({                                 //Caso esteja salvo e não tenha expirado, ele deleta o codigo da tabela (nao sera mais necessario)
                    where: {
                        code
                    }
                })
                return {sucess: true, userId: dbResult.userId}
            }else{
                return {sucess: false, reason: 'expiredCode'}
            }
        }
    }else{
        return {sucess: false, reason: 'noCode'}
    }
}

const escapeDateValue = (v) => {
    return (Number(v) < 10)? "0"+v: v;
}

const clearExpiredItems = () =>{                            //Exclui tabela de códigos de validação de email todos os códigos que já foram expirados ou inativados
    console.log('Iniciando limpeza da tabela de códigos de reset de senha.')
    Model.findAll().then((result)=>{
        if(result || result.length > 0){
            let destroyed = 0;
            for(var i in result){
                const valid = (new Date(result[i].expiration) < new Date());        //Retorna booleano informando se a data de expiração é menor do que data atual
                if(!valid){
                    Model.destroy({where: {
                        id: result[i].id
                    }})
                    destroyed++;
                }
            }
            console.log(`${destroyed} item(s) removido(s) da tabela de códigos de reset de senha.`);
        }else{
            console.log('Nenhum item na tabela de códigos de reset de senha. Nada foi alterado.')
        }
    });
}

setInterval(clearExpiredItems, config.expiredCodesCleanupTime*1000) 