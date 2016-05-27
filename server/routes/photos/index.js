'use strict';

const handlers = require('server/routes/photos/handlers');

const register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/photo',
        config: handlers.getPhotos
    });

    server.route({
        method: 'GET',
        path: '/photo/{photoPath*}',
        config: handlers.getPhotoByID
    });

    server.route({
        method: 'POST',
        path: '/photo',
        config: handlers.postPhoto
    });

    next();
};


register.attributes = {
    name : 'photoApi',
    version : '1.0.0'
};

module.exports = register;
