'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Skill = new Schema({
  name: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('Skills', Skill);