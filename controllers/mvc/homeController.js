exports.home = function (req, res) {
    sess = req.session;
    if (sess.user) {
        res.render("../views/home/index.html");
    } else {
        res.redirect("/");
    }
};