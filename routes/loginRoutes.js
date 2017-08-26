'use strict';
module.exports = function(app) {
  var controller = require('../controllers/api/loginController');
  var defaultcontroller = require('../controllers/mvc/defaultController');
  // todoList Routes
  app.route('/login')
    .get(defaultcontroller.default_page)
    .post(controller.login);

  app.route('/register')
    .get(defaultcontroller.register_page)
    .post(controller.register);
};
