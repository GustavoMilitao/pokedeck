'use strict';
module.exports = function(app) {
  var controller = require('../controllers/api/defaultController');

  // todoList Routes
  app.route('/')
    .get(controller.default_page)

  app.route('')
    .get(controller.default_page)
};
