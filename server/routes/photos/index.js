'use strict';

const handlers = require('server/routes/photos/handlers');

const register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/photos',
    config: handlers.getPhotos
  });

  server.route({
    method: 'GET',
    path: '/photos/{photoPath*}',
    config: handlers.getPhotoByID
  });

  server.route({
    method: 'POST',
    path: '/photos',
    config: handlers.postPhoto
  });

  next();
};

register.attributes = {
  name: 'photoApi',
  version: '1.0.0'
};

module.exports = register;
