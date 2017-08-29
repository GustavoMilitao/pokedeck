exports.home = function (req, res) {
    var cookie = req.cookies['user'];
    if (cookie) {
        var path = require("path");
        res.render(path.join(__dirname+"/../../views/home/index.html"));
    } else {
        res.redirect("/");
    }
};