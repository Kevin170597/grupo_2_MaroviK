const {check, validationResult,body} = require("express-validator");

module.exports = [
    check("firstName")
    .isLength({
        min:1
    })
    .withMessage("Debe ingresar un nombre"),

    check("lastName")
    .isLength({
        min:1
    })
    .withMessage("Debe ingresar un apellido"),

    check("email")
    .isEmail()
    .withMessage("Debes ingresar un email válido"),

    check("password")
    .isLength({
        min:5,
        max:20
    })
    .withMessage("La contraseña debe tener entre 5 y 20 caracteres"),

    check("password2")
    .isLength({
        min:5,
        max:20
    })
    .withMessage("La contraseña debe tener entre 5 y 20 caracteres")
]