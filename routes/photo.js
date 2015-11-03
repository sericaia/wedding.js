'use strict';

var Path = require('path');
var Joi = require('joi');

var register = function (plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/photo/{photoPath*}',
    handler: {
      directory: {
        path: 'public',
        listing: false
      }
    },
    config: {
      description: 'Return photos',
      notes: 'The photoPath is mandatory',
      tags: ['get', 'photos'],
      validate: {
        params: {
          photoPath: Joi.string().min(4).required()
        }
      }
    }
  });

  plugin.route({
    method: 'POST',
    path: '/photo',
    handler: function(request, reply) {
      reply('Hello, World!');
    }
  });

  next();
};


register.attributes = {
	name : 'photoApi',
	version : '1.0.0'
};

module.exports = register;
