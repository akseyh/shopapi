const express = require('express')
const app = express()
const port = 3000
const shoppingProductInfo = require('shopping-product-info');

app.get('/', (req, res) => {
    res.sendFile( __dirname + "/templates/" + "index.html" );
})

app.get('/api', async (req, res) => {
    let data = 
        req.query.origin == 'hepsiburada'
        ? await shoppingProductInfo('https://www.hepsiburada.com/' + req.query.pathname):
        req.query.origin == 'trendyol'
        ? await shoppingProductInfo('https://www.trendyol.com/' + req.query.pathname):
        req.query.origin == 'gittigidiyor'
        ? await shoppingProductInfo('https://www.gittigidiyor.com/' + req.query.pathname):
        undefined;

    res.send(data);
})

app.listen(port, () => console.log(`We are live on ${port}!`))