let db = require('../../database/models');

module.exports = {
    list: (req, res) =>{
        db.Products.findAll({
            include: [{association: "subcategory"},{association: "user"}]
        })
        .then(result =>{
            result.forEach(result =>{
                result.setDataValue('endpoint', '/api/products/' + result.id);
            })
            res.json({
                meta: {
                    status:200,
                    total: result.length +1
                },
                data: result
            })
        })
    },
    id: (req, res) =>{
        let id = req.params.id;
        db.Products.findOne({
            where:{id:id},
            include: [{association: "subcategory"},{association: "user"}]
        })
        .then(result =>{
            res.json(result)
        })
    }
}