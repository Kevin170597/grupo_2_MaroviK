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
    },
    view_for_subcategory: (req,res) => {
        
        let categoria = req.params.categoria;
        let subcategoria = req.params.subcategoria;

        let dataCategory = categoriesDataBase.filter(category => {
            return (category.category == categoria);
        });

        let dbProductsForCategory = productsDataBase.filter(productCategory => {
            return (productCategory.category == categoria);
        });

        let dbProductsForSubcategory = dbProductsForCategory.filter(product => {
            return (product.subcategory == subcategoria);
        });

        //res.send(dataCategory);
        //res.send(dbProductsForSubcategory);
        res.render('subcategoria', {

            categoria: dataCategory[0],
            productos: dbProductsForSubcategory
        });
    
    },
    agregar:function(req, res){
        res.render('productsAdd', {
            title: "Agregar producto",
            cate
        })
    }
}