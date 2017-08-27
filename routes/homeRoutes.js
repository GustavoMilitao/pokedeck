'use strict';
module.exports = function(app) {
  var controller = require('../controllers/mvc/homeController');
  //var shared = require('./shared');

  // todoList Routes
  app.route('/home')
    .get(controller.home)
};
