const Model = require('./../models').blackList;
const auth = require('./../auth');
const blacklistCleanupTime = require('./../config').auth.blacklistCleanupTime

exports.insertToken = async (token) =>{
   if(token){   //verifica se há token sendo recebido
    const result = await Model.findOrCreate({   //busca o token ou cria caso não exista e armazena em uma constante
        where:{
            token: token
        },
        defaults:{
            token: token
        }
    });
    if (result[1]) {     
        console.log('Registro de token criado com sucesso!'); //cria registro do token e retorna uma booleana
        return true;
    } else {             
        console.log('Registro de token já criado!');
        return false;
    }
    
   }else{
    return false;
   }
}

exports.toLocateToken = async (token) =>{
    if(token){
        const stored_token = await Model.findOne({where: {token:token}})
        if(!stored_token){
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
}

const cleaner = async () =>{
    try {
        const registros = await Model.findAll();
        for (const registro of registros) {
          const tokenValido = await auth.validaTokenBL(registro.token); 
          if (!tokenValido.valid) {
            await registro.destroy(); 
            console.log(`Token inválido removido: ${registro.token}`);
          }else{
            console.log(`Token válido encontrado: ${registro.token}`);
          }
        }
        console.log('Limpeza da blacklist concluída.');
      } catch (error) {
        console.error('Erro ao limpar a blacklist:', error);
      }
}

setInterval(cleaner, blacklistCleanupTime*1000);