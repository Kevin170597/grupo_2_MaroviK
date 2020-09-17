const dbUsers = require("../data/databaseUsers");
const productsDataBase = require('../data/database');

const {validationResult, body} = require("express-validator");
const bcrypt = require('bcrypt');
const fs = require("fs");
const path = require("path");

module.exports = {
    view_user_profile: (req, res) => {
        res.render('userProfile', {
            title: "Perfil de Usuario",
            user: req.session.user,
            productos: productsDataBase.filter(producto => {
                return (producto.id > 352 && producto.id <= 356)
            })
        });
    },
    register: function(req, res){
        res.render("register", {
            user: req.session.user
        })
    },
    processRegister: function(req, res){
        let errors = validationResult(req);
        let lastID = 0;

        //-- Asigno el valor del último id de usuario a lastID, considerando un base de datos sin registros
        if(dbUsers.length > 0){
            lastID = dbUsers.length;
        }
       
        if(errors.isEmpty()){ //-- Si no hay ningún error (errors vacio) => registro un nuevo usuario --
            let nuevoUsuario = {
                id: lastID + 1,
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10), //-- Encripta la contraseña --
                avatar:(req.files[0])?req.files[0].filename:"default.png",
                rol:"user"
            }

            dbUsers.push(nuevoUsuario);

            fs.writeFileSync(path.join(__dirname, "..", "data", "users.json"),JSON.stringify(dbUsers), "utf-8");

            //res.send(dbUsers);
            res.redirect("/users/login");
        }else{
            res.render("register",{
                errors: errors.mapped(), //-- Renderiza y muestra en la vista todos los errores --
                old: req.body //-- Maneja la persistencia de datos --
            });
        }
    },
    login: function(req, res){
        res.render("inicioSesion", {
            user: req.session.user
        })
    },
    processLogin: function(req, res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsers.forEach(usuario =>{
                if(usuario.email == req.body.email){
                    req.session.user = {
                        id: usuario.id,
                        //nombre: usuario.name,
                        //apellido: usuario.lastName,
                        nick: usuario.name + " " + usuario.lastName,
                        rol: usuario.rol,
                        email: usuario.email,
                        avatar: usuario.avatar
                    }
                }
            })
            if(req.body.recordar){
                res.cookie('userMarovik',req.session.user,{maxAge:1000*60*2});
            }
            //res.send(req.session)
            return res.redirect("/")
        }else{
            return res.render("inicioSesion", {
                errors: errors.mapped(),
                old: req.body,
                user: req.session.user
            });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        if(req.cookies.userMarovik){
            res.cookie('userMarovik','',{maxAge:-1})
        }
        res.redirect('/');
    }
}