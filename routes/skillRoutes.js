'use strict';
module.exports = function(app) {
  var controller = require('../controllers/api/skillController');
  
  app.route('/skills')
    .get(controller.list_all_skills);

};
