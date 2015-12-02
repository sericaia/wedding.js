'use strict';

const methods = require('server/routes/commons/methods');
const handlers = {};

handlers.getStaticAssets = {
    handler: methods.getStaticAssets,
    description: 'Return the static assets',
    tags: ['get', 'static assets']
};

handlers.getApp = {
    handler: methods.getApp,
    description: 'Return the React App',
    tags: ['get', 'app']
};

module.exports = handlers;
