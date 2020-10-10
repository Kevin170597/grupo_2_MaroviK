//const productsDataBase = require('../data/database');
//const categoriesDataBase = require("../data/databaseCategories");
const fs = require('fs');
const path = require('path');
const db = require('../database/models');

module.exports = {
    view_products: (req,res) => {
        res.render('categoria', {
            user: req.session.user
        });
    },
    /*view_for_category: (req,res) => {

        let categoria = req.params.categoria;
        let dataCategory = categoriesDataBase.filter(category => {
            return(category.category == categoria);
        });
        res.render('categoria', {
            user: req.session.user,
            categoria: dataCategory[0]
        });
    },*/
    view_for_category: (req, res) => {
        let categoria = req.params.categoria;
        db.Categories.findOne({where: {namePath: categoria}})
        .then(category => {
            let idCategory = category.id;
            db.Subcategories.findAll({where: {id_category: idCategory}})
            .then(subcategory => {
                res.render("categoria", {
                    user: req.session.user,
                    titulo: category.title,
                    imagen: category.image,
                    subcategory: subcategory,
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    },
    ver_productos: (req, res) => {
        let categoria = req.params.categoria;
        let subcategoria = req.params.subcategoria;
        
        db.Categories.findOne({where: {namePath: categoria}})
        .then(category => {
            db.Subcategories.findOne({where:{name_path: subcategoria}})
            .then(subcategory => {
            db.Products.findAll({where: {id_subcategory: subcategory.id}})
                .then(producto => {
                    res.render("subcategoria", {
                        user: req.session.user,
                        producto: producto,
                        subcategoria: subcategory,
                        titulo: category.title
                    })
                })
            })
        })
        .catch(errors => {
           console.log(errors)
        })
    },
    /*view_for_subcategory: (req,res) => {
        
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

            user: req.session.user,
            categoria: dataCategory[0],
            productos: dbProductsForSubcategory
        });
    
    },*/
    view_product_detail: (req,res) => {
    
        let idProduct = req.params.id;
        product = productsDataBase.filter(producto => {
            return (producto.id == idProduct);
        });
        
        res.render('productDetail', {

            user: req.session.user,
            producto: product[0]
        });
    },
    ver_producto_detalle:(req, res) => {
      let idproduct = req.params.idproduct;
      
      db.Products.findOne({where: {id: idproduct}})
      .then(producto => {
          res.render("productDetail", {
              user: req.session.user,
              producto: producto
          })
      })
      .catch(error => {
          console.log(error)
      })
    },
    view_product_add: (req, res) => {

        let categoria;
        let subcategoria;

        if(req.query.categoria){
            categoria = req.query.categoria;
            subcategoria = req.query.subcategoria;
        }

        db.Categories.findAll({
            include:[{association:'subcategories'}]
        })
        .then(categorias => {

            res.render('productAdd', {

                title: "Agregar Producto",
                categoria:categoria,
                subcategoria:subcategoria,
                categorias: categorias,
                user: req.session.user
            })
        })
        .catch(errores => {
            res.send(errores)
        })
    },
    public_product: (req, res, next) => {

        db.Subcategories.findOne({
            where:{
                name_path: req.body.subcategory
            }
        })
        .then(subcategory => {
            db.Products.create({
                name: req.body.name.trim(),
                mark: req.body.mark.trim(),
                price: Number(req.body.price),
                discount: Number(req.body.discount),
                stock:Number(req.body.stock),
                description: req.body.description.trim(),
                image: (req.files[0])?req.files[0].filename:"default-image.png",
                id_subcategory: subcategory.id
            })
            .then(result => {
                console.log(result);
                res.redirect('/');
                /*let ruta = "/products/" + req.body.category + "/" + req.body.subcategory;
                res.redirect(ruta);*/
            })
            .catch(error => {
                res.send(error);
            })
        })
        .catch(error => {
            res.send(error);
        })   
    },
    view_product_show: (req, res) => {

        let idProduct = req.params.id;
        let productResult = productsDataBase.filter(producto => {
            return (producto.id == idProduct);
        });

        res.render('productShow', {
            title: "Ver/Editar Producto",
            producto: productResult[0],
            total: productsDataBase.length,
            categorias: categoriesDataBase,
            user: req.session.user
        })
    },
    update_product: (req, res) => {

        let idProduct = req.params.id;

        productsDataBase.forEach(producto => {

            if(producto.id == idProduct){
                producto.id = Number(req.body.id);
                producto.category = req.body.category.trim();
                producto.subcategory = req.body.subcategory.trim();
                producto.name = req.body.name.trim();
                producto.mark = req.body.mark.trim();
                producto.price = Number(req.body.price);
                producto.discount = Number(req.body.discount);
                producto.description = req.body.description.trim();
                producto.image = (req.files[0])?req.files[0].filename:producto.image;
            }
        });

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productsDataBase.json'), JSON.stringify(productsDataBase), 'utf-8');

        res.redirect('/products/show/' + idProduct);
    },
    delete_product: (req, res) => {

        let idProduct = req.params.id;
        let aEliminar;

        productsDataBase.filter(producto => {
            if(producto.id == idProduct){
                aEliminar = productsDataBase.indexOf(producto);
            }
        })

        productsDataBase.splice(aEliminar, 1);

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productsDataBase.json'), JSON.stringify(productsDataBase), 'utf-8');

        res.redirect('/users/profile');  
    }
}