const dbUsers = require("../data/databaseUsers");

const {check, validationResult, body} = require("express-validator");
const bcrypt = require("bcrypt")

module.exports = [
    check("email")
    .isEmail()
    .withMessage("Debe ingresar un email válido"),
    
    body("email")
    .custom(function(value){
        let usuario1 = dbUsers.filter(function(usuario1){
            return usuario1.email == value
        })
        if(usuario1 == true){
            return false
        }else{
            return true
        }
    })
    .withMessage("El usuario no está registrado"),

    body("password")
    .custom(function(value,{req}){
        let result = true;
        dbUsers.forEach(user => {
            if(user.email == req.body.email){
                if(!bcrypt.compareSync(value, user.password)){
                    result = false
                }
            }
        });
        if (result == false){
            return false
        }else{
            return true
        }
    })
    .withMessage("Contraseña incorrecta")
]