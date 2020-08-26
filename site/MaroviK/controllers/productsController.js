const productsDataBase = require('../data/database');
const categoriesDataBase = require("../data/databaseCategories")

module.exports = {
    view_products: (req,res) => {
        res.render('categoria');
    },
    view_for_category: (req,res) => {

        let categoria = req.params.categoria;
        let dataCategory = categoriesDataBase.filter(category => {
            return(category.category == categoria);
        });
        res.render('categoria', {
            categoria: dataCategory[0]
        });

    }
}