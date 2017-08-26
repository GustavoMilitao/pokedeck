'use strict';

var sess;

var path    = require("path");

exports.default_page = function (req, res) {
  sess = req.session;
  if (sess && sess.user) {
    res.redirect("/home")
  } else {
     res.render(path.join(__dirname+"/../../views/login/index.html"));
  }
};


