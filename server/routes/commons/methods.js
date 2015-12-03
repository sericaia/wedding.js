'use strict';

const methods = {};

methods.getStaticAssets = {
    directory: {
        path: 'client',
        index: ['index.html']
    }
};

methods.getApp = {
    view: 'Default'
};

module.exports = methods;
