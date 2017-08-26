'use strict';

var sess;

exports.default_page = function (req, res) {
  sess = req.session;
  if (sess.user) {
    res.redirect("/home")
  } else {
     res.render("../views/login/index.html");
  }
};


