const productsDataBase = require('../data/database');
const categoriesDataBase = require("../data/databaseCategories");
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {validationResult, body} = require("express-validator");

module.exports = {
    view_products: (req,res) => {
        res.render('categoria', {
            user: req.session.user
        });
    },
    /*search: (req,res) => {
        let search = req.query.search;
        if(search == ""){
            res.redirect("/")
        }else{
            db.Products.findAll({
                where: {
                    [Op.or]: [{name:{[Op.like]: ["%" + search + "%"]}}, {mark:{[Op.like]: ["%" + search + "%"]}}]
                }
            })
            .then(productos => {
                db.Subcategories.findAll({include: {association: "category"}, where:{}})
                .then(subcategorias => {
                    res.render("subcategoria", {
                        productos: productos,
                        subcategorias:subcategorias
                    })
                })
                .catch(errors => {
                    console.log(errors)
                })
            })
            .catch(errors => {
                console.log(errors)
            })
        }
    },*/
    viewForCategory: (req, res) => {
        let categoria = req.params.categoria
        db.Categories.findOne({
            where: {namePath: categoria},
            include:{association:"subcategories"}
            
        })
        .then(category => {
            
            res.render("categoria", {
                user: req.session.user,
                category: category
            })
        })
        .catch(errors => {
            console.log(errors)
        })
    },
    viewForSubcategory: (req, res) => {

        let categoria = req.params.categoria;
        let subcategoria = req.params.subcategoria

        db.Categories.findOne({
            where: {namePath: categoria},
            include:{association:"subcategories"}
            
        })
        .then(category => {

            db.Subcategories.findOne({
                where:{
                    name_path: subcategoria
                }
            })
            .then(subcategory => {

                db.Products.findAll({
                    where: {
                        id_subcategory: subcategory.id
                    }
                })
                .then(productsForSubcategory => {
                    let marks = [];
                    productsForSubcategory.forEach(product => {

                        if(marks == ""){
                            marks.push(product.mark)
                        }else{
                            if(marks.indexOf(product.mark) == -1){
                                marks.push(product.mark)
                            }
                        }
                    
                    })
                    res.render('subcategoria', {

                        user: req.session.user,
                        category:category,
                        products: productsForSubcategory,
                        marks:marks
                        
                    })
                })
                .catch(errors => {
                    console.log(errors);
                })
            })
            .catch(errors => {
                console.log(errors);
            })


        })
        .catch(errors => {
            console.log(errors);
        })

    },
    viewProductDetail:(req, res) => {
        let idproduct = req.params.idproduct;
  
        db.Products.findOne({where: {id: idproduct}})
        .then(producto => {
            db.Products.findAll({
                where: {
                    id_subcategory: producto.id_subcategory,
                    discount:{[Op.not]:0}
                },
                order:[["discount", "DESC"]],
                limit: 4
            })
            .then(productoSubcategory => {
                res.render("productDetail", {
                    user: req.session.user,
                    producto: producto,
                    ofertas: productoSubcategory
                })
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
      },
    viewProductAdd: (req, res) => {

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
            console.log(errores)
        })
    },
    publicProduct: (req, res, next) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            db.Users.findOne({

                where: {
                    id:req.session.user.id
                }
            })
            .then(user => {
    
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
                        id_subcategory: subcategory.id,
                        id_user: user.id
                    })
                    .then(result => {
                        console.log(result);
                        
                        let ruta = "/products/categorias/" + req.body.subcategory
                        res.redirect(ruta);
                    })
                    .catch(error => {
                        res.send(error);
                    })
                })
                .catch(error => {
                    res.send(error);
                }) 
            })
            .catch(errors => {
                console.log(errros);
            })
        }else {
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
                user: req.session.user,
                errors: errors.mapped(),
                old: req.body
                })
            })
            .catch(errores => {
                console.log(errores)
            })
        }
    },
    viewProductShow: (req, res) => {
        
        db.Products.findOne({
            where:{
                id:req.params.id
            },
            include:[{
                association:'subcategory',
                include:[{
                    association:'category'
                }]
            }]    
        })
        .then(product => {

            db.Categories.findAll({
                include:[{association:'subcategories'}]
            })
            .then(categorias => {
                db.Products.findAll({
                    include:[{association:'subcategory'}]
                })
                .then(productos => {
                    
                    res.render('productShow', {
                        title: "Ver/Editar Producto",
                        producto: product,
                        total:productos.length,
                        categorias:categorias,
                        user:req.session.user
        
                    })
                })
                .catch(errors => {
                    console.log(errors);
                })
            })
            .catch(errors => {
                console.log(errors);
            })
        })
        .catch(errors => {
            console.log(errors)
        })    
    },
    updateProduct: (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            db.Products.update(
                {
                    name: req.body.name.trim(),
                    mark: req.body.mark.trim(),
                    price: Number(req.body.price),
                    discount: Number(req.body.discount),
                    description: req.body.description.trim(),
                    stock: Number(req.body.stock),
                    image: (req.files[0])?req.files[0].filename:req.body.image,
                    id_subcategory: req.body.subcategory
                },
                {
                    where:{
                        id:req.params.id
                    }
                }
            )
            .then( result => {
                
                return res.redirect('/products/show/'+ req.params.id)
            })
            .catch( errors => {
                console.log(errors)
            })
        } else {
            db.Products.findOne({
                where:{
                    id:req.params.id
                },
                include:[{
                    association:'subcategory',
                    include:[{
                        association:'category'
                    }]
                }]    
            })
            .then(product => {
    
                db.Categories.findAll({
                    include:[{association:'subcategories'}]
                })
                .then(categorias => {
                    db.Products.findAll({
                        include:[{association:'subcategory'}]
                    })
                    .then(productos => {
                        
                        res.render('productShow', {
                            title: "Ver/Editar Producto",
                            producto: product,
                            total:productos.length,
                            categorias:categorias,
                            user:req.session.user,
                            errors: errors.mapped(),
                            old: req.body
            
                        })
                    })
                    .catch(errors => {
                        console.log(errors);
                    })
                })
                .catch(errors => {
                    console.log(errors);
                })
            })
            .catch(errors => {
                console.log(errors);
            })
        }
        
    },
    deleteProduct: (req, res) => {

        //borrar el archivo de imagen de un producto
        if(fs.existsSync('public/images/products/'+req.body.image)&&req.body.image != "default.png"){
            fs.unlinkSync('public/images/products/'+req.body.image)
        }
        db.Products.destroy({
            where:{
                id:req.params.id
            }
        })
        .catch(errors => {
            console.log(errors);
        })

        return res.redirect('/users/profile')
    },
    addCart: (req, res) => {
        db.Cart.create(
            {
                id_user: req.session.user.id,
                id_product: req.params.idproduct,
                quantity: 2
            }
        )
        .then(result => {
            res.redirect("/users/add/cart")
        })
    }
}