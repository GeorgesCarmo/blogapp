/*---------------------------------CARREGANDO MÓDULOS-----------------------------------*/
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
//const mongoose = require('mongoose')

/*------------------------------------CONFIGURAÇÕES-------------------------------------*/
    // bodyParser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    // handlebars    
        app.engine('handlebars', handlebars({defaultLayouts: 'main'}))
        app.set('view engine', 'handlebars')

    // mongoose
        //TODO



/*-----------------------------------------ROTAS----------------------------------------*/






/*----------------------------------------OUTROS----------------------------------------*/
const PORT = 8081
app.listen(PORT,()=> {
    console.log("SERVER ONLINE!")
})