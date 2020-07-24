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
    res.sendFile( __dirname + "/templates/" + "index.html" )
})

app.get('/api', (req, res) => {
    try {
        let siteLink = null
        if(req.query.origin == 'hepsiburada') siteLink = 'https://www.hepsiburada.com'
        else if(req.query.origin == 'trendyol') siteLink = 'https://www.trendyol.com'
        else if(req.query.origin == 'gittigidiyor') siteLink = 'https://www.gittigidiyor.com'

        if(!siteLink) res.send({IsSuccess: false, Result: 'Link hatalı!'})
        shoppingProductInfo(`${siteLink}/${req.query.pathname}`)
            .then(response => {
                if(!response) res.send({IsSuccess: false, Result: 'Hata!'})
                res.send({IsSuccess: true, Result: response}); 
            })
            .catch(err => {res.send({IsSuccess: false, Result: err})})
    } catch(err) {
        res.send({IsSuccess: false, Result: err})
    }  
})

app.get('*', (req, res) => {
    res.send({IsSuccess: false, Result: 'Bu dizin bulunamadı!'})
})

app.listen(port, () => console.log(`We are live on ${port}!`))