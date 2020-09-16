const dbUsers = require("../data/databaseUsers");

const {check, validationResult,body} = require("express-validator");

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

    body('email')
    .custom((value) => {
        for(let i = 0; i < dbUsers.length; i++){
            if(dbUsers[i].email == value){
                return(false);
            }
        }
        return(true);
    })
    .withMessage('Este email ya está registrado'),

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
    .withMessage('Debe aceptar las bases y condiciones')
    
]