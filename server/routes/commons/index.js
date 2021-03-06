'use strict';

const handlers = require('server/routes/commons/handlers');

const register = function (server, options, next) {
  // Add the React-rendering view engine
  server.views({
    engines: {
      jsx: require('hapi-react-views')
    },
    relativeTo: 'client', // search views in parent folder
    path: 'views'
  });

  // Add a route to serve static assets (CSS, JS, IMG)
  server.route({
    method: 'GET',
    path: '/{param*}',
    config: handlers.getStaticAssets
  });

  // Add main app route
  server.route({
    method: 'GET',
    path: '/',
    config: handlers.getApp
  });

  next();
};

register.attributes = {
  name: 'commonApi',
  version: '1.0.0'
};

module.exports = register;
