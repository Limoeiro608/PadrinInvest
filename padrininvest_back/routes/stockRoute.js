const routerStock = require('express').Router();
const auth = require("./../auth");

const Stock = require('../controllers/stockController');

module.exports = app =>{
    routerStock.post('/topTen', auth.autenticado, Stock.topTen);
    routerStock.post('/returnStock', auth.autenticado, Stock.returnStock);
    routerStock.post('/localizationStock', auth.autenticado, Stock.localizationStock);
    routerStock.post('/historicStock', auth.autenticado, Stock.historicStock);
    routerStock.post('/saveStock', auth.autenticado, Stock.saveStock);
    routerStock.post('/readStock', auth.autenticado, Stock.readStock);
    routerStock.post('/updateStock', auth.autenticado, Stock.updateStock);
    routerStock.post('/deleteStock', auth.autenticado, Stock.deleteStock);
    app.use('/api/stock', routerStock);
    }