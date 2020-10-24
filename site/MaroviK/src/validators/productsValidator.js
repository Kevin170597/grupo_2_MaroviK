const db = require('../database/models');

const {check, validationResult,body} = require("express-validator");

module.exports = [
    check("name")
    .isLength({
        min:5
    })
    .withMessage("Debes ingresar un titulo  de mas de 5 caracteres"),

    check("mark")
    .isLength({
        min:2
    })
    .withMessage("Debe ingresar una marca de mas de 2 caracteres"),

    check("description")
    .isLength({
        min:20
    })
    .withMessage("La descripción debe contener al menos 20 caracteres"),

    /*check("image")
    .isMimeType("image/jpg")
    .withMessage("Extension incorrecta")*/
]