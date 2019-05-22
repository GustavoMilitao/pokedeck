'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Movie = new Schema({
  id: {
    type: String,
    default: ""
  },
  genres: {
    type: Array,
    default: []
  },
  original_language: {
    type: String,
    default: ""
  },
  original_title: {
    type: String,
    default: ""
  },
  overview: {
    type: String,
    default: ""
  },
  release_date: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('Movies', Movie);