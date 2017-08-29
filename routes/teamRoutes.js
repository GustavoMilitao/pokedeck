'use strict';
module.exports = function(app) {
  var controller = require('../controllers/api/teamController');
  
  app.route('/teams')
    .post(controller.create_a_team);

  app.route('/teams/:teamId')
    .put(controller.update_a_team)
    .delete(controller.delete_a_team);
};
