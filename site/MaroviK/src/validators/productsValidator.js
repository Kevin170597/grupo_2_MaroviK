const db = require('../database/models');
const path = require ('path');
//const {check, validationResult, body} = require("express-validator");

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

    body("image")
    .custom(function(value, {req}){
        let extensiones_permitidas = [".gif", ".jpg", ".jpeg", ".png"];
        let permitido = false;
        
        let ext = path.extname(req.files[0].filename);
    
        extensiones_permitidas.forEach(extension => {
            if(extension == ext){
                permitido = true
            }
        })

        if(!permitido)
        {
            return false;
        }
        return (true);
    })
    .withMessage('Comprueba la extensión del archivo(.png/.jpg/.jpeg/.gif)')
]