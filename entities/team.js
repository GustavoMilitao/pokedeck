'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Team = new Schema({
  idUser: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  pokemons: {
    type: Array,
    default: []
  },
});

module.exports = mongoose.model('Teams', Team);