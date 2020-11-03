let db = require('../../database/models');

module.exports = {
    list: (req, res) =>{
        db.Users.findAll({
            include: [{association: "products_public"}]
        })
        .then(result =>{
            result.forEach(result =>{
                result.setDataValue('endpoint', '/api/users/' + result.id);
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
        db.Users.findOne({
            where:{id:id},
            include: [{association: "products_public"}]
        })
        .then(result =>{
            res.json(result)
        })
    },
    validatorEmail: (req, res)=>{
        let email = req.params.email;
        db.Users.findOne({
            where:{email:email}
        })
        .then(result =>{
            let response = { meta:{ status:200}, data: result } 
            console.log(result)
            res.json(response) 
        })
        .catch(error=>{
            console.log("Error")
        })
    }
}