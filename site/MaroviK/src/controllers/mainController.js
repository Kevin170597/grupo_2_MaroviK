const db = require('../database/models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
    index: (req,res) => {
      db.Products.findAll({
        where:{
          discount:{[Op.not]:0}
        },
          order:[["discount", "DESC"]],
          limit: 12
      })
      .then(productos=>{
        res.render("index", {
          title: "MaroviK",
          user: req.session.user,
          productos: productos
        })
      })
        /*res.render('index',{
          title: "MaroviK",
          user: req.session.user 
        });*/
      

    },
    nosotros: (req, res) =>{
      res.render('nosotros')
    }
}