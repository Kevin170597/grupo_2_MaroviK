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
            productos: productsDataBase.filter(producto => {
                return (producto.id > 352 && producto.id <= 356)
            })
        });
    },
    register: function(req, res){
        res.render("register")
    },
    processRegister: function(req, res){
        let errors = validationResult(req);

        //-- Asigno el valor del último id de usuario a lastID, considerando un base de datos sin registros
        if(dbUsers.length == 0){
            lastID = 0;
        }else{
            lastID = dbUsers.length - 1;
        }
       
        if(errors.isEmpty()){ //-- Si no hay ningún error (errors vacio) => registro un nuevo usuario --
            let nuevoUsuario = {
                id: lastID + 1,
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10), //-- Encripta la contraseña --
                //avatar:(req.files[0])?req.files[0].filename:"default.png",
                avatar: "",
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
        res.render("inicioSesion")
    },
    processLogin: function(req, res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsers.forEach(usuario =>{
                if(usuario.email == req.body.email){
                    req.session.user = usuario
                }
            })
            return res.redirect("/users/profile")
        }else{
            return res.render("inicioSesion", {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
}