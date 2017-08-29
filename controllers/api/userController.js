'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  Team = mongoose.model('Teams');

exports.list_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};




exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.send({ success: true, user : user});
  });
};

exports.list_my_teams = function(req, res) {
    var query = { idUser: req.params.userId };
    Team.find(query, function (err, response) {
      if (err)
        res.send(err);
      res.send({ success: true, teams: response });
    }); 
};

exports.update_a_user = function(req, res) {
  User.findOneAndUpdate(
      {_id: req.params.userId}, 
      req.body, 
      {new: true}, 
      function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function(req, res) {


  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};