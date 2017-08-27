'use strict';


  var sess;
  var mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.default_page = function (req, res) {
  sess = req.session;
  if (sess.user) {
    res.redirect("/home")
  } else {
     res.render("../views/login/index.html");
  }
};


exports.login = function (req, res) {
  var query = { user: req.body.user, senha: req.body.senha };
  var user = User.find(query, function(err, result){
    if(err)
      res.send(err);
    if(result && result != null){
      var sess = req.session;
      sess.user = result.__id;
    }else{
      res.success = false;
    }
  });
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