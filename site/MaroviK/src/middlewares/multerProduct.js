//-----------     PREPARACIÓN PARA PODER SUBIR IMAGENES       --------------
//-- Módulos  Para el manejo de imÁgenes --
const multer = require('multer');
const path = require('path');

//--Método que recibe como parámetro un objeto literal --
//-- destination(req, file, callback)
let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})

module.exports = upload;