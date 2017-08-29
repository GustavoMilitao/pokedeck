'use strict';


var mongoose = require('mongoose'),
  Team = mongoose.model('Teams');



exports.create_a_team = function(req, res) {
  var new_team = new Team(req.body);
  new_team.save(function(err, response) {
    if (err)
      res.send(err);
    res.send({success : true, team : response });
  });
};

exports.update_a_team = function(req, res) {
  Team.findOneAndUpdate(
      {_id: req.params.teamId}, 
      req.body, 
      {new: true}, 
      function(err, response) {
    if (err)
      res.send(err);
    res.send({ success : true, team : response });
  });
};


exports.delete_a_team = function(req, res) {
  Team.remove({
    _id: req.params.teamId
  }, function(err, team) {
    if (err)
      res.send(err);
    res.send({ success : true });
  });
};