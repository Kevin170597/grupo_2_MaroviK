const productsDataBase = require('../data/database');

module.exports = {
    view_products: (req,res) => {
        res.render('categoria');
    },
    view_for_category: (req,res) => {

        let category = req.params.categoria;
        let products_for_category = productsDataBase.filter(product => {
            return(product.category == category);
        });
        res.render ('categoria');

    }
}