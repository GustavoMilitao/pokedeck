'use strict';

exports.list_all_skills = function(req, res) {
  var Pokedex = require('pokedex-promise-v2');
  var P = new Pokedex();
  P.getMovesList()
  .then(function(response) {
    res.send({ success : true, skills : response });
  })
};