exports.home = function (req, res) {
    sess = req.session;
    if (sess.user) {
        var path = require("path");
        res.render(path.join(__dirname+"/../../views/home/index.html"));
    } else {
        res.redirect("/");
    }
};