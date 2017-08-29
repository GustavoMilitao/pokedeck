'use strict';


var sess;
var mongoose = require('mongoose'),
  User = mongoose.model('Users');
var path = require("path");

exports.default_page = function (req, res) {
  var cookie = req.cookies['user'];
  if (cookie) {
    res.redirect("/home")
  } else {
    res.render(path.join(__dirname + "/../../views/login/index.html"));
  }
};


exports.login = function (req, res) {
  var query = { email: req.body.email, password: req.body.password };
  var user = User.find(query, function (err, result) {
    if (err)
      res.send(err);
    var us = result[0];
    if (us) {
      res.send({ success: true, user: us.id });
    } else {
      res.send({ success: false });
    }
  });
};

exports.register_page = function (req, res) {
  // var cookie = req.cookie['user'];
  // if (cookie) {
  //   res.redirect("/home")
  // } else {
  res.render(path.join(__dirname + "/../../views/register/index.html"));
  // }
};

exports.register_done_page = function (req, res) {
  res.render(path.join(__dirname + "/../../views/registerDone/index.html"));
};

exports.register = function (req, res) {
  var query = { email: req.body.email };
  User.find(query, function (err, user) {
    if (err)
      res.send(err);
    if (user.length > 0) {
      res.send({ success: false });
    } else {
      var new_user = new User(req.body);
      new_user.save(function (err, user) {
        if (err)
          res.send(err);
        res.send({ success: true });
      });
    }
  });
};