'use strict';
module.exports = function(app) {
  var controller = require('../controllers/api/pokemonController');

  // todoList Routes
  app.route('/pokemons')
    .get(controller.list_all_pokemons)
    .post(controller.create_a_pokemon);

  app.route('/pokemons/:pokemonId')
    .get(controller.read_a_pokemon)
    .put(controller.update_a_pokemon)
    .delete(controller.delete_a_pokemon);
};
