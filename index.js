'use strict';

require('babel-core/register')({});

const Hapi = require('hapi');
const config = require('getconfig');
const inert = require('inert');
const vision = require('vision');
const routes = require('server/routes');
const async = require('async');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || config.port
});

async.parallel([
    function (cb) {

        server.register(inert, cb);
    },
    function (cb) {

        server.register(vision, cb);
    },
    function (cb) {

        server.register(routes, cb);
    }
], (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server started at: ' + server.info.uri);
    });
});

module.exports = server;
