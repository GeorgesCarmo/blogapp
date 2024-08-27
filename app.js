/*---------------------------------CARREGANDO MÓDULOS-----------------------------------*/
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
//const mongoose = require('mongoose')

/*------------------------------------CONFIGURAÇÕES-------------------------------------*/
    // bodyParser
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())

    // handlebars    
        app.engine('handlebars', handlebars.engine({defaultLayouts: 'main'}))
        app.set('view engine', 'handlebars')

    // public
        app.use(express.static( "public"))

    // mongoose
        //TODO



/*-----------------------------------------ROTAS----------------------------------------*/
    app.use('/admin', admin)





/*----------------------------------------OUTROS----------------------------------------*/
const PORT = 8081
app.listen(PORT,()=> {
    console.log("SERVER ONLINE!")
})