'use strict';

var Path = require('path');
var Joi = require('joi');

var register = function (plugin, options, next) {

  // Add the React-rendering view engine
  plugin.views({
    engines: {
      jsx: require('hapi-react-views')
    },
    relativeTo: Path.join(__dirname, '..'), //search views in parent folder
    path: 'views'
  });

  // Add a route to serve static assets (CSS, JS, IMG)
  plugin.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'client',
        index: ['index.html']
      }
    }
  });

  // Add main app route
  plugin.route({
    method: 'GET',
    path: '/',
    handler: {
      view: 'Default'
    }
  });

  next();
};


register.attributes = {
  name : 'commonApi',
  version : '1.0.0'
};

module.exports = register;
