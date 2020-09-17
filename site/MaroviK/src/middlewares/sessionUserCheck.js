module.exports = function sessionUserCheck(req, res, next){
    if(req.session){
        next()
    }else{
        res.redirect("/users/login");
    }
}