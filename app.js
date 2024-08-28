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
require("./models/Postagem")
const Postagem = mongoose.model("postagens")

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
app.get("/", (req, res)=>{
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens)=>{
        res.render("index", {postagens:postagens})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/404")
    })
    
})

app.get("/posts", (req, res)=>{
    res.send("Lista de posts")
})

app.use('/admin', admin)

app.use("/404", (req, res)=>{
    res.send("Erro 404")
})

app.get("/postagem/:slug", (req, res)=>{
    Postagem.findOne({slug:req.params.slug}).lean().then((postagem)=>{
        if(postagem){
            res.render("postagem/index", {postagem:postagem})
        }else{
            req.flash("error_msg", "Essa postagem não existe")
            res.redirect("/")
        }
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/")
    })
})

/*----------------------------------------OUTROS----------------------------------------*/
const PORT = 8081
app.listen(PORT,()=> {
    console.log("SERVER ONLINE!")
})