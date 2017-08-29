'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  Team = mongoose.model('Teams');


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