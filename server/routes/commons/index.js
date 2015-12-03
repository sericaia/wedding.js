'use strict';

const Path = require('path');

const handlers = require('server/routes/commons/handlers');

const register = function (plugin, options, next) {

    // Add the React-rendering view engine
    plugin.views({
        engines: {
            jsx: require('hapi-react-views')
        },
        relativeTo: Path.join(__dirname, '../..'), //search views in parent folder
        path: 'views'
    });

    // Add a route to serve static assets (CSS, JS, IMG)
    plugin.route({
        method: 'GET',
        path: '/{param*}',
        config: handlers.getStaticAssets
    });

    // Add main app route
    plugin.route({
        method: 'GET',
        path: '/',
        config: handlers.getApp
    });

    next();
};


register.attributes = {
    name : 'commonApi',
    version : '1.0.0'
};

module.exports = register;
