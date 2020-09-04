const dbUsers = require("../data/databaseUsers");
const productsDataBase = require('../data/database');
const {validationResult} = require("express-validator");
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
        let errors = validationResult(req)
        lastID = dbUsers.length;
        if(errors.isEmpty()){
            let nuevoUsuario = {
                id: lastID + 1,
                Nombre: req.body.firstName,
                Apellido: req.body.lastName,
                Email: req.body.email,
                Contraseña: req.body.password,
                rol:"user"
            }
            dbUsers.push(nuevoUsuario);
            fs.writeFileSync(path.join(__dirname, "..", "data", "users.json"),JSON.stringify(dbUsers), "utf-8")
            return res.redirect("/users/login")
        }else{
            res.render("register",{
                errors:errors.mapped(),
                old:req.body
            })
        }
    },
    login: function(req, res){
        res.render("inicioSesion")
    },
    processLogin: function(req, res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsers.forEach(usuario=>{
                if(usuario.Email == req.body.Email){
                    req.session.user = usuario
                }
            })
            return res.redirect("/users")
        }else{
            return res.render("userLogin")
        }
    },
}