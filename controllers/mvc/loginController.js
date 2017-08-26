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


exports.login = function (req, res) {
  sess = req.session;
  sess.user=req.body.user;
  res.redirect('/home');
};

exports.register_page = function (req, res) {
  if (sess.user) {
    res.redirect("/home")
  } else {
     res.render("../views/register/index.html");
  }
};

exports.register = function (req, res) {
  var controller = require('../controllers/api/userController');
  controller.create_a_user(req,res);
  login(req, res);
};