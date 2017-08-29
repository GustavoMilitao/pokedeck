'use strict';
module.exports = function(app) {
  var controller = require('../controllers/mvc/homeController');
  
  app.route('/home')
    .get(controller.home)
};
