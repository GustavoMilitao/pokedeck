'use strict';
module.exports = function(app) {
  var controller = require('../controllers/mvc/homeController');
  //var shared = require('./shared');

  // todoList Routes
  app.route('/home')
    .get(controller.home)

    app.route('/home/team')
    .get(controller.team)

    app.route('/home/newPokemon')
    .get(controller.team)
};
