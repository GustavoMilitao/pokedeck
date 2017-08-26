'use strict';
module.exports = function(app) {
  var controller = require('../controllers/api/skillController');

  // todoList Routes
  app.route('/skills')
    .get(controller.list_all_skills)
    .post(controller.create_a_skill);

  app.route('/skills/:skillId')
    .get(controller.read_a_skill)
    .put(controller.update_a_skill)
    .delete(controller.delete_a_skill);
};
