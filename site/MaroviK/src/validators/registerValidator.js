const db = require('../database/models');
const path = require ('path');
const {check, validationResult, body} = require("express-validator");

//res.send (req.body)

module.exports = [
    check("name")
    .isLength({
        min:1
    })
    .withMessage("Debes ingresar tu nombre"),

    check("lastName")
    .isLength({
        min:1
    })
    .withMessage("Debes ingresar tu apellido"),

    check("email")
    .isEmail()
    .withMessage("Debes ingresar un email válido"),

    body("email")
    .custom(function(value){
        return db.Users.findOne({
            where:{
                email:value
            }
        })
        .then(user => {
            if(user){
                return Promise.reject()
            }
        })
        .catch(() => {
            return Promise.reject('Este email ya está registrado')
        })
    }),
    check("password")
    .isLength({
        min:5,
        max:20
    })
    .withMessage("La contraseña debe tener entre 5 y 20 caracteres"),

    body("password2")
    .custom(function(value, {req}){
        if(value != req.body.password){
            return (false);
        }
        return (true);
    })
    .withMessage('Las contraseñas no coinciden'),

    check('bases')
    .isString('on')
    .withMessage('Debe aceptar las bases y condiciones'),

    body("avatar")
    .custom(function(value, {req}){
        let extensionesPermitidas = [".gif", ".jpg", ".jpeg", ".png"];
        let permitido = false;
        
        let ext = req.files[0]?path.extname(req.files[0].filename):"";

        extensionesPermitidas.forEach(extension => {
            if(extension == ext){
                permitido = true
            }
        })

        if(!permitido && ext != "")
        {
            return false;
        }
        return (true);
    })
    .withMessage('Comprueba la extensión del archivo(.png/.jpg/.jpeg/.gif)')
    
]