const dbUsers = require("../data/databaseUsers");
const productsDataBase = require('../data/database');

const db = require("../database/models");

const {validationResult, body} = require("express-validator");
const bcrypt = require('bcrypt');
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
    register: function(req, res){
        res.render("register", {
            user: req.session.user
        })
    },
    processRegister: function(req, res){
        let errors = validationResult(req);
       
        if(errors.isEmpty()){ //-- Si no hay ningún error (errors vacio) => registro un nuevo usuario --

            db.Users.create(
                {
                    name: req.body.name,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password,10), //-- Encripta la contraseña --
                    avatar:(req.files[0])?req.files[0].filename:"default.png",
                    rol:"user"
                }
            )
            .then(result => {
                console.log(result);
                
                return res.redirect('/users/login');
            })
            .catch(errores => {
                console.log(errores);
            })
        }else {
            res.render("register",{
                errors: errors.mapped(), //-- Renderiza y muestra en la vista todos los errores --
                old: req.body, //-- Maneja la persistencia de datos --
                user: req.session.user
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

            db.Users.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(user => {
    
                req.session.user = {
                    id: user.id,
                    nick: user.name + " " + user.last_name,
                    rol: user.rol,
                    email: user.email,
                    avatar: user.avatar
                }
                
                if(req.body.recordar){
                    res.cookie('userMarovik',req.session.user,{maxAge:1000*60*2});
                }
    
                res.locals.user = req.session.user
    
                return res.redirect("/")
            })

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
    },
    search: (req,res) => {
        let search = req.query.search;
        if(search == ""){
            res.redirect("/")
        }else{
            db.Products.findAll({
                where: {
                    [Op.or]: [{name:{[Op.like]: ["%" + search + "%"]}}, {mark:{[Op.like]: ["%" + search + "%"]}}]
                }
            })
            .then(productos => {
                db.Subcategories.findAll({include: {association: "category"}, where:{}})
                .then(subcategorias => {
                    db.Users.findOne({
                        where: {
                            id: req.session.user.id
                        },
                        include:[{association:'products_public'}]
                    
                    })
                    .then(user => {
            
                        res.render('userProfile', {
                            title: "Perfil de Publicaciones",
                            user: req.session.user,
                            userInfo: user,
                            productos:user.products_public,
                            actualizarProductos: productos,
                        })    
                    })
                    .catch(errores => {
                        console.log(errores);
                    })
                })
                .catch(errors => {
                    console.log(errors)
                })
            })
            .catch(errors => {
                console.log(errors)
            })
        }
    },
    viewAdminProfile: (req, res) => {

        db.Users.findOne({
            where: {
                id: req.session.user.id
            },
            include:[{association:'products_public'}]
        
        })
        .then(user => {

            res.render('userProfile', {
                title: "Perfil de Publicaciones",
                userInfo: user,
                user: req.session.user,
                productos:user.products_public
            })    
        })
        .catch(errores => {
            console.log(errores);
        })
    },
    viewProfile:(req,res) => {
        if(req.session.user){

            db.Users.findByPk(req.session.user.id)
            .then(user => {

                res.render('perfilUsuario', {
                    user:user
                })
            })
        }else{
            return (res.redirect('/'));
        }
    },
    updatePasswordView: function(req, res){
        if(req.session.user){
            db.Users.findByPk(req.session.user.id)
            .then(user => {
                res.render("updatePassword", {
                    user: user
                })
            })
        }
    },
    updatePassword: function(req, res){
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Users.update(
                {
                    password: bcrypt.hashSync(req.body.password,10)
                },
                {
                    where: {id: req.params.id}
                }
            )
            .then(result =>{
                return res.redirect("/")
            })
            .catch(error =>{
                console.log(error)
            })
        }else {
            db.Users.findByPk(req.session.user.id)
            .then(user => {
                res.render("updatePassword", {
                    user: user,
                    errors: errors.mapped(),
                    old: req.body,
                    user: req.session.user
                })
            })
        }
    },
    updateProfile:function(req, res){

        db.Users.update(
            {
                avatar:(req.files[0])?req.files[0].filename:req.session.user.avatar,
                address: (req.body.address != ' ')?req.body.address.trim():null,
                city: (req.body.city != ' ')?req.body.city.trim():null,
                province: (req.body.province != ' ')?req.body.province.trim():null,
                cp: (req.body.cp)?(Number(req.body.cp)):null
            },
            {
                where:{
                    id: req.params.id
                }
            }
        )
        .then( result =>{
            db.Users.findByPk(req.session.user.id)
            .then(user => {
                if(req.session.user.avatar != user.avatar)
                {
                    //borrar el archivo de imagen de perfil
                    if(fs.existsSync('public/images/users/'+req.session.user.avatar)&&req.session.user.avatar != "default.png"){
                    fs.unlinkSync('public/images/users/'+req.session.user.avatar)
                    }
                    req.session.user.avatar = user.avatar
                }
                
                return res.redirect('/users/profile')
            })
            //console.log(result)
            //return res.redirect('/users/profile')
        })
        .catch(errors =>{
            console.log(errors)
        })
    },
    delete: function(req, res){

        //borrar el archivo de imagen de perfil
        if(fs.existsSync('public/images/users/'+req.session.user.avatar)&&req.session.user.avatar != "default.png"){
            fs.unlinkSync('public/images/users/'+req.session.user.avatar)
        }

        //cerrar la session y borrar cookie
        req.session.destroy();
        if(req.cookies.userMarovik){
            res.cookie('userMarovik','',{maxAge:-1});
        }
        //borrar el registro de la base de datos
        db.Users.destroy({
            where:{
                id:req.params.id
            }
        })
        return res.redirect('/');
    }
    
}