module.exports = {
    index: (req,res) => {
        res.render('index',{
          title: "MaroviK",
          user: req.session.user 
        });
    }
}