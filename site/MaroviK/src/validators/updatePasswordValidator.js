const db = require('../database/models');
const {check, validationResult, body} = require("express-validator");
const bcrypt = require("bcrypt")


module.exports = [


    check("passwordActual")
    .isLength({
        min:1
    })
    .withMessage("Debes ingresar tu contraseña actual."),


    body("passwordActual")
    .custom(function(value,{req}){
        
        return db.Users.findOne({
            where:{
                email:req.session.user.email
            }
        })
        .then(user => {
            if(!bcrypt.compareSync(value, user.dataValues.password)){//-- Verifica si la contraseña recibida(value) es igual a la almacenada en la base de datos  --
                return Promise.reject()
            }
        })
        .catch(() => {
            return Promise.reject("Contraseña incorrecta")
        })
    }),
    
    check("password")
    .isLength({
        min: 8,
        max: 20
    })
    .withMessage("La contraseña nueva debe tener entre 8 y 20 caracteres"),

    body("password2")
    .custom(function(value, {req}){
        if(value != req.body.password){
            return (false);
        }
        return (true);
    })
    .withMessage('Las contraseñas no coinciden'),
]