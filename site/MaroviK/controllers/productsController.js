const productsDataBase = require('../data/database');
const categoriesDataBase = require("../data/databaseCategories");
const fs = require('fs');
const path = require('path');

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
    view_product_detail: (req,res) => {
    
        let idProduct = req.params.id;
        product = productsDataBase.filter(producto => {
            return (producto.id == idProduct);
        });
        
        res.render('productDetail', {

            producto: product[0]
        });
    },
    view_product_add: (req, res) => {

        let categoria;
        let subcategoria;

        if(req.query.categoria){
            categoria = req.query.categoria;
            subcategoria = req.query.subcategoria;
        }
        
        res.render('productAdd', {

            title: "Agregar Producto",
            categoria:categoria,
            subcategoria:subcategoria,
            categorias: categoriesDataBase
        })
    },
    public_product: (req, res, next) => {

        let lastId = 0;

        productsDataBase.forEach(producto => {
            if(producto.id > lastId){
                lastId = producto.id;
            }
        });

        let newProduct = {

            id: lastId + 1,
            category: req.body.category.trim(),
            subcategory: req.body.subcategory.trim(),
            name: req.body.name.trim(),
            mark: req.body.mark.trim(),
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            description: req.body.description.trim(),
            image: (req.files[0])?req.files[0].filename:"default-image.png"
        }

        productsDataBase.push(newProduct);

        fs.writeFileSync(path.join(__dirname, "..", "data", "productsDataBase.json"), JSON.stringify(productsDataBase), 'utf-8')
       
        res.redirect(path.join("/", req.body.category, req.body.subcategory));
    },
    agregar:function(req, res){
        res.render('productsAdd', {
            title: "Agregar producto"
        });
    }
}