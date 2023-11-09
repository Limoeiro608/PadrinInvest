const axios = require('axios');


module.exports.searchStock = async (ticker) =>{
    if(ticker){
        try{
            const searchStock = axios.get(`https://brapi.dev/api/available?search=${ticker}&token=vz3hBaxzfs1phZXTaJaqkT`);
            return searchStock
        }catch(e){
            return false;
        }
    }else{
        return false;
    }
}

module.exports.infoStock = async (stock) =>{
    if(stock){
        try{
            const infoStock = await axios.get(`https://brapi.dev/api/quote/${stock}?range=3mo&interval=1d&token=tcvMUnhyUDadW5t178mWjw`);
            return infoStock;
        }catch(e){
            return false;
        }
    }else{
        return false;
    }
}

module.exports.infoStockAll = async (stock,range) =>{
    if(stock && range){
        try{
            const infoStock = await axios.get(`https://brapi.dev/api/quote/${stock}?range=${range}&interval=1d&token=tcvMUnhyUDadW5t178mWjw`);
            return infoStock;
        }catch(e){
            return false;
        }
    }else{
        return false;
    }
}
module.exports.topTen = async () =>{
    try{
        const topFive = await axios.get(`https://brapi.dev/api/quote/list?sortBy=volume&sortOrder=desc&limit=10&token=oTRLpYG9bYDaZnyDUpHXXg`);
        return topFive;
    }catch(e){
        return false;
    }
}

/*
let updateObj = {};
    for(const key of Object.keys(req.body.pessoa_data)){
        if(
            key == 'nome'
            || key == 'nome_fantasia'
            ){
                updateObj[key] = req.body.pessoa_data[key];
            }
        }Pessoa.update(updateObj,{where: {id: req.body.pessoaId}}).then(pp => {
            
            

    await User.destroy({
  where: {
    firstName: "Jane"
  },
});
            
            
            
            let updateObj = {};
    for(const key of Object.keys(req.body)){
        if(key == 'valorPago' || key == 'cotacao'){
                updateObj[key] = Number(req.body[key]);
            }
        }
        await userStock.update(updateObj,{where: {id: res.locals.id,stock:req.body.stock}});
        res.status(200).json({sucess:true});*/