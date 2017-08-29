'use strict';

exports.list_all_pokemons = function(req, res) {
  var Pokedex = require('pokedex-promise-v2');
  var P = new Pokedex();
  P.getPokemonsList()
  .then(function(response) {
    res.send({ success : true, pokemons : response });
  })
};