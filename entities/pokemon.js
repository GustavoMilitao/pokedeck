'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Pokemon = new Schema({
  name: {
    type: String,
    default: ""
  },
 skillsCount: {
    type: Number,
    default: 0
  },
  skillsID: {
      type: Array,
      default: []
    }
});

module.exports = mongoose.model('Pokemons', Pokemon);