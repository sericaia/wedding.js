'use strict';

const convict = require('convict');

const conf = convict({
  server: {
    host: {
      doc: 'The address of the HTTP Server running the app',
      format: String,
      default: '0.0.0.0',
      env: 'WEDDING_JS_HOST'
    },
    port: {
      doc: 'The port of the HTTP Server running the app',
      format: Number,
      default: 3000,
      env: 'WEDDING_JS_PORT'
    }
  }
});

conf.validate({ strict: true });

module.exports = conf;
