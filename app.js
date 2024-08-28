/*---------------------------------CARREGANDO MÓDULOS-----------------------------------*/
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()

/*------------------------------------CONFIGURAÇÕES-------------------------------------*/
    // bodyParser
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())

    // handlebars    
        app.engine('handlebars', handlebars.engine({defaultLayouts: 'main'}))
        app.set('view engine', 'handlebars')

    // public
        app.use(express.static( "public"))

/*        app.use((req, res, next)=>{
            console.log("Oi, eu sou um midleware")
            next()
        })
*/
    // mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost/blogapp')
        .then(()=>{
            console.log("Conectado ao MongoDB")
        })
        .catch((err)=>{
            console.log("Erro ao se conectar: "+err)
        })

    // session
        app.use(session({
            secret: "cursoNode",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())

    // middleware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('erro_msg')
            next()
        }) 
   
/*-----------------------------------------ROTAS----------------------------------------*/
    app.use('/admin', admin)





/*----------------------------------------OUTROS----------------------------------------*/
const PORT = 8081
app.listen(PORT,()=> {
    console.log("SERVER ONLINE!")
})