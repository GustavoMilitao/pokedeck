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
  var query = { email: req.body.email, password: req.body.password };
  var user = User.find(query, function(err, result){
    if(err)
      res.send(err);
    var us = result[0];
    if(us){
      var sess = req.session;
      sess.user = us.id;
      res.send({ success : true });
    }else{
      res.send({ success : false });
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