exports.home = function (req, res) {
    sess = req.session;
    if (sess.user) {
        var path = require("path");
        res.render(path.join(__dirname+"/../../views/home/index.html"));
    } else {
        res.redirect("/");
    }
};

exports.team = function (req, res) {
    sess = req.session;
    if (sess.user) {
        var path = require("path");
        const fs = require('fs')
        fs.readFile(path.join(__dirname+"/../../views/home/team.html"), 'utf8', function(err, html){
            res.send({ success : true, partial : html })
        });
    } else {
        res.redirect("/");
    }
};

exports.pokemon = function (req, res) {
    sess = req.session;
    if (sess.user) {
        var path = require("path");
        const fs = require('fs')
        fs.readFile(path.join(__dirname+"/../../views/home/pokemon.html"), 'utf8', function(err, html){
            res.send({ success : true, partial : html })
        });
    } else {
        res.redirect("/");
    }
};