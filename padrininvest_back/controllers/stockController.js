const consult = require('./../stockConsult');
const {userStock} = require('../models');

exports.returnStock = async (req,res,next) =>{
    if(req.body){
        if(req.body.stock){
            consult.searchStock(req.body.stock).then(async (data)=>{ 
                data = data.data.stocks;
                    res.status(200).json({sucess: true, result:data}); 
            });
        }else{
            res.status(400).json({sucess: false, reason: 'Missing data'});
        }
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data'});
    }
}

exports.localizationStock = async (req,res,next) =>{
    if(req.body){
        if(req.body.stock){
            consult.infoStock(req.body.stock).then(async (data)=>{
                try{
                    data = data.data.results;
                    if(data){
                        for(var i in data){
                            res.status(200).json({sucess: true, price: data[i].regularMarketPrice, stock: data[i].symbol, longName: data[i].longName});
                            break;
                        }
                    }else{
                        res.status(400).json({sucess: false, reason: 'Missing data'});
                    }
                }catch(e){
                    res.status(400).json({sucess: false, reason: 'Essa ação não existe'});
                }
            });
        }else{
            res.status(400).json({sucess: false, reason: 'Missing data'});
        }
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data'});
    }
}

exports.saveStock = async (req, res, next) =>{
    if(req.body){
        if(req.body.stock){
            consult.searchStock(req.body.stock).then(async (data)=>{ 
                data = data.data.stocks
                if(data){
                    var encontrado = false;
                    for(var i in data){
                        if(data[i]==req.body.stock.toUpperCase()){
                            const result = await userStock.create({
                                userId:res.locals.id,
                                stock:req.body.stock,
                                cotacao:req.body.cotacao,
                                valorPago:req.body.valorPago,
                                date:req.body.date
                            });
                            res.status(200).json({save: true, created: result.stock});
                            encontrado = true;
                            break;
                        }
                    }if(encontrado==false){
                        res.status(400).json({save: encontrado, reason: 'Ação não encontrada'});
                    }
            }else{
                res.status(400).json({sucess: false, reason: 'Missing data'});
            }});
           
        }else{
            res.status(400).json({sucess: false, reason: 'Missing data'});
        }
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data'});
    }
}

exports.historicStock =  async (req,res,next)=>{
    if(req.body){
        if(req.body.stock && req.body.range){
            consult.infoStockAll(req.body.stock,req.body.range).then(async (data)=>{
                try{
                    data = data.data.results;
                    if(data){
                            res.status(200).json({sucess: true, brapi:data});
                    }else{
                        res.status(400).json({sucess: false, reason: 'Missing data'});
                    }
                }catch(e){
                    res.status(400).json({sucess: false, reason: 'Essa ação não existe'});
                }
            });
        }else{
            res.status(400).json({sucess: false, reason: 'Missing data'});
        }
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data'});
    }
}

exports.readStock = async (req,res,next)=>{
    if(req.body){
        if(req.body.stock){
            consult.infoStock(req.body.stock).then(async (data)=>{
                data = data.data.results;
                if(data){
                    if(req.body.cotacao && req.body.valorPago){
                        const result = await userStock.findOne({
                            where:{
                                userId:res.locals.id,
                                stock:req.body.stock,
                                cotacao:req.body.cotacao,
                                valorPago:req.body.valorPago
                            }
                        });
                        res.status(200).json({sucess:true, valorPago: result.valorPago, cotacao: result.cotacao, valorTotal: result.valorPago*result.cotacao, brapi: data});
                    }else{
                        const result = await userStock.findOne({
                            where:{
                                userId:res.locals.id,
                                stock:req.body.stock
                            }
                        });
                        res.status(200).json({sucess:true, valorPago: result.valorPago, cotacao: result.cotacao, brapi: data});
                    }
                }else{
                    res.status(400).json({sucess: false, reason: 'Missing data'});
                }
            });
        }else{
            const result = await userStock.findAll({
                where:{
                    userId:res.locals.id
                }
            });
            res.status(200).json({sucess: true, result});
        }
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data'});
    }
}

exports.updateStock = async (req,res,next) =>{
    if(req.body){
        if(req.body.stock){
            let updateObj = {};
                for(const key of Object.keys(req.body)){
                    if(key == 'valorPago' || key == 'cotacao'){
                        updateObj[key] = Number(req.body[key]);
                    }
                }
                await userStock.update(updateObj,{where: {userId: res.locals.id,stock:req.body.stock}});
                res.status(200).json({sucess:true});
        }else{
            res.status(400).json({sucess: false, reason: 'Missing data'});
        }
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data'});
    }
}

exports.deleteStock = async (req,res,next) =>{
    if(req.body){
		if(req.body.stockId){
			await userStock.destroy({
				where:{
					userId:res.locals.id,
					id:req.body.stockId
				}
			});
			res.status(200).json({sucess:true});
		}else{
			res.status(400).json({sucess: false, reason: 'Missing data'});
		}
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data'});
    }
}


exports.topTen = async (req,res,next) =>{
        consult.topTen().then(async (data)=>{
            data = data.data.stocks;
            if(data){
                res.status(200).json({sucess: true, result: data});
            }else{
                res.status(400).json({sucess: false, reason: 'Erro na comunicação com a api da brapi'});
            }
        });
}

/*
exports.stockPerUser = async (req,res,next) =>{
    const result = await userStock.findAll({
        where:{
            userId:res.locals.id
        }
    });
    let stocksUser = new Array();
    for(var i in result){
        const stocks = await userStock.findOne({
            where:{
                id:result[i].userId
            },
            attributes: []
        })
        stocksUser.push(stocks);
    }
    res.status(200).json({sucess:true, result:stocksUser});
}*/