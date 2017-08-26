'use strict';


var mongoose = require('mongoose'),
  Skill = mongoose.model('Skills');

exports.list_all_skills = function(req, res) {
  Skill.find({}, function(err, skill) {
    if (err)
      res.send(err);
    res.json(skill);
  });
};




exports.create_a_skill = function(req, res) {
  var new_skill = new Skill(req.body);
  new_skill.save(function(err, skill) {
    if (err)
      res.send(err);
    res.json(skill);
  });
};


exports.read_a_skill = function(req, res) {
  Skill.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_skill = function(req, res) {
  Skill.findOneAndUpdate(
      {_id: req.params.skillId}, 
      req.body, 
      {new: true}, 
      function(err, skill) {
    if (err)
      res.send(err);
    res.json(skill);
  });
};


exports.delete_a_skill = function(req, res) {


  Skill.remove({
    _id: req.params.skillId
  }, function(err, skill) {
    if (err)
      res.send(err);
    res.json({ message: 'Skill successfully deleted' });
  });
};