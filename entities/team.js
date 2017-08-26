'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Team = new Schema({
  idUser: {
    type: String,
    default: ""
  },
  Name: {
    type: String,
    default: ""
  },
  pokemonCount: {
    type: Number,
    default: 0
  },
  pokemons: {
    type: Array,
    default: []
  },
});

module.exports = mongoose.model('Teams', Team);