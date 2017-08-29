'use strict';
module.exports = function(app) {
  var controller = require('../controllers/api/userController');

  app.route('/users/:userId')
    .get(controller.read_a_user)

    app.route('/users/:userId/teams')
    .get(controller.list_my_teams)
};
