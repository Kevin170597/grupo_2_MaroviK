const productsDataBase = require('../data/database');
const categoriesDataBase = require("../data/databaseCategories");
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
    view_products: (req,res) => {
        res.render('categoria', {
            user: req.session.user
        });
    },
    search: (req,res) => {
        let search = req.query.search;
        if(search == ""){
            res.redirect("/")
        }else{
            db.Products.findAll({where:{name:{[Op.like]: ["%" + search + "%"]}}})
            .then(productos => {
                db.Subcategories.findAll({include: {association: "categories"}, where:{}})
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
    },
    view_for_category: (req, res) => {
        let categoria = req.params.categoria
        db.Categories.findOne({
            include:{association:"subcategories"},
            where: {namePath: categoria}
        })
        .then(categories => {
            res.render("categoria", {
                user: req.session.user,
                titulo: categories.title,
                imagen: categories.image,
                subcategory: categories.subcategories
            })
        })
        .catch(errors => {
            console.log(errors)
        })
    },
    view_for_subcategory: (req, res) => {
        let subcategoria = req.params.subcategoria
        db.Subcategories.findOne({
            include:{association: "products"},
            where:{name_path:subcategoria}
        })
        .then(producto => {
            db.Subcategories.findAll({where: {id_category: producto.id_category}})
            .then(subcategorias => {
                res.render("subcategoria",{
                    user: req.session.user,
                    productos: producto.products,
                    subcategorias: subcategorias
                })
            })
            .catch(errors => {console.log(errors)})
        })
        .catch(errors => {console.log(errors)})
    },
    view_product_detail:(req, res) => {
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
            res.send(errores)
        })
    },
    publicProduct: (req, res, next) => {

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
          
    },
    view_product_show: (req, res) => {

        //let idProduct = req.params.id;
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
                    //res.send(productos)
                    res.render('productShow', {
                        title: "Ver/Editar Producto",
                        producto: product,
                        total:productos.length,
                        categorias:categorias,
                        user:req.session.user
        
                    })
                })
            })
        })    
        /*let productResult = productsDataBase.filter(producto => {
            return (producto.id == idProduct);
        });

        res.render('productShow', {
            title: "Ver/Editar Producto",
            producto: productResult[0],
            total: productsDataBase.length,
            categorias: categoriesDataBase,
            user: req.session.user
        })*/
    },
    update_product: (req, res) => {

        //res.send(req.body)
        db.Products.update(
            {
                name: req.body.name.trim(),
                mark: req.body.mark.trim(),
                price: Number(req.body.price),
                discount: Number(req.body.discount),
                description: req.body.description.trim(),
                stock: Number(req.body.stock),
                image: (req.files[0])?req.files[0].filename:req.body.image
            },
            {
                where:{
                    id:req.params.id
                }
            }
        )
        .then( result => {
            console.log(result)
            return res.redirect('/users/profile')
        })
        .catch( errors => {
            console.log(errors)
        })
        //let idProduct = req.params.id;

        /*productsDataBase.forEach(producto => {

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

        res.redirect('/products/show/' + idProduct);*/
    },
    delete_product: (req, res) => {

        //borrar el archivo de imagen de perfil
        /*if(fs.existsSync('public/images/products/'+req.body.image)&&req.body.image != "default.png"){
            fs.unlinkSync('public/images/product/'+req.body.image)
        }*/
        db.Products.destroy({
            where:{
                id:req.params.id
            }
        })
        return res.redirect('/users/profile')
        /*let idProduct = req.params.id;
        let aEliminar;

        productsDataBase.filter(producto => {
            if(producto.id == idProduct){
                aEliminar = productsDataBase.indexOf(producto);
            }
        })

        productsDataBase.splice(aEliminar, 1);

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productsDataBase.json'), JSON.stringify(productsDataBase), 'utf-8');

        res.redirect('/users/profile');  */
    }
}