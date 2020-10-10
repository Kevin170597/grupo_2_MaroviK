
const db = require("../database/models");

module.exports = (req, res, next) => {
    if(req.cookies.userMarovik){
        req.session.user = req.cookies.userMarovik;
        next();
    }else {
        next();
    }
}