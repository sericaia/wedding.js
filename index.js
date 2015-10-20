var Hapi = require('hapi');
var config = require('getconfig');

var routes = require('routes');
// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || config.port
});

//Register the API
server.register(routes, function (err) {
  if (err) {
    throw err;
  }
  // Start the server
  server.start(function (err) {
    if (err) {
      throw err;
    }
    console.log('Server started at: ' + server.info.uri);
  });
});
