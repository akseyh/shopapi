const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const shoppingProductInfo = require('shopping-product-info');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    let data = 
        req.query.origin == 'hepsiburada'
        ? await shoppingProductInfo('https://www.hepsiburada.com/' + req.query.pathname):
        req.query.origin == 'trendyol'
        ? await shoppingProductInfo('https://www.trendyol.com/' + req.query.pathname):
        req.query.origin == 'gittigidiyor'
        ? await shoppingProductInfo('https://www.gittigidiyor.com/' + req.query.pathname):
        undefined;
    if(data != undefined) res.send(data);
    else res.sendFile( __dirname + "/templates/" + "index.html" )
})

app.get('/api', async (req, res) => {
    let data = 
        req.query.origin == 'hepsiburada'
        ? await shoppingProductInfo('https://www.hepsiburada.com/' + req.query.pathname):
        req.query.origin == 'trendyol'
        ? await shoppingProductInfo('https://www.trendyol.com/' + req.query.pathname):
        req.query.origin == 'gittigidiyor'
        ? await shoppingProductInfo('https://www.gittigidiyor.com/' + req.query.pathname):
        "bulunamadı";
    res.send(data);
})

app.listen(port, () => console.log(`We are live on ${port}!`))