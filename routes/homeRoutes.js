'use strict';
module.exports = function(app) {
  var controller = require('../controllers/mvc/homeController');
  
  // todoList Routes
  app.route('/home')
    .get(controller.home)
};
