'use strict';
module.exports = function(app) {
  var controller = require('../controllers/api/teamController');
  //var shared = require('./shared');
  // todoList Routes
  app.route('/teams')
    .get(controller.list_all_teams)
    .post(controller.create_a_team);

  app.route('/teams/:teamId')
    .get(controller.read_a_team)
    .put(controller.update_a_team)
    .delete(controller.delete_a_team);
};
