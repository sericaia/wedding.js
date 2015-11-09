'use strict';

var Path = require('path');
var Joi = require('joi');

var register = function (plugin, options, next) {

plugin.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {

    reply('Hello!');
  }
});

next();
};


register.attributes = {
name : 'commonApi',
version : '1.0.0'
};

module.exports = register;
