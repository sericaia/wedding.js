'use strict';

require('babel-register')({
  presets: ['react']
});

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Nes = require('nes');

const config = require('config');
const routes = require('server/routes');

const SERVER_HOST = config.get('server.host');
const SERVER_PORT = config.get('server.port');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
  host: SERVER_HOST,
  port: SERVER_PORT
});

const pulgins = [Nes, Inert, Vision].concat(routes);
server.register(pulgins, (err) => {
  if (err) {
    throw err;
  }
  server.subscription('/photos');
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server started at: ' + server.info.uri);
  });
});

module.exports = server;
