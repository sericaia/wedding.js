'use strict';

require('babel-core/register')({});

const Hapi = require('hapi');
const config = require('getconfig');
const inert = require('inert');
const vision = require('vision');
const routes = require('server/routes');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || config.port
});

const pulgins = [inert, vision].concat(routes);
server.register(pulgins, (err) => {

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
