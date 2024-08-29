const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model('usuarios')
const bcrypt = require("bcryptjs")

router.get("/registro", (req, res)=>{
    res.render("usuarios/registro")
})

router.post("/registro", (req, res)=>{
    
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }
    if(req.body.senha.length < 4){
        erros.push({texto: "Senha muito curta"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas são diferentes, tente novamente."})
    }
    if(erros.length > 0){
        res.render("usuarios/registro", {erros: erros})
    }else{
        Usuario.findOne({email:req.body.email}).lean().then((usuario)=>{
            console.log(usuario)
            if(usuario){
                req.flash("success_msg", "Ja existe uma conta com esse email em nosso sistema");
                res.redirect("/usuarios/registro");
            }else{
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })
                    bcrypt.hash(novoUsuario.senha, 10, (err, hash)=>{
                        if(err){
                            req.flash("error_msg", "Houve um erro durante o salvamento")
                            res.redirect("/")
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(()=>{
                            req.flash("success_msg", "Usuario criado com sucesso")
                            res.redirect("/")
                        }).catch(()=>{
                            req.flash("error_msg", "Houve um erro ao criar o novo usuario, tente novamente.")
                            res.redirect("/usuarios/registro")
                        })
                    })
            }
        }).catch(()=>{
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    }
})

router.get("/login", (req, res)=>{
    res.render("usuarios/login")
})

module.exports = router