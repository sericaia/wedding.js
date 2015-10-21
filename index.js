var Hapi = require('hapi');
var config = require('getconfig');
var inert = require('inert');
var routes = require('routes');
var async = require('async');
// Create a server with a host and port
var server = new Hapi.Server();



server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || config.port
});


async.parallel([
  function(cb) {
    server.register(inert, cb);
  },
  function(cb) {
    server.register(routes, cb);
  }
], function(err){
  if (err) {
    throw err;
  }
  server.start(function (err){
    if (err) {
      throw err;
    }
    console.log('Server started at: ' + server.info.uri);
  });
});
