'use strict';
module.exports = function(app) {
  var controller = require('../controllers/mvc/loginController');

  app.route('/login')
    .get(controller.default_page)
    .post(controller.login);

    app.route('/')
    .get(controller.default_page)

  app.route('')
    .get(controller.default_page)

  app.route('/register')
    .get(controller.register_page)
    .post(controller.register);

  app.route('/registerDone')
    .get(controller.register_done_page)
};
