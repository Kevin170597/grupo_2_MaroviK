const dbUsers = require("../data/databaseUsers");
const productsDataBase = require('../data/database');

module.exports = {
    view_user_profile: (req, res) => {
        res.render('userProfile', {
            title: "Perfil de Usuario",
            productos: productsDataBase.filter(producto => {
                return (producto.id > 352 && producto.id <= 356)
            })
        });
    }
}