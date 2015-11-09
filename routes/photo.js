'use strict';

var Path = require('path');
var Joi = require('joi');
var through2 = require('through2');
var fs = require('fs');

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
    config: {
      payload: {
        output: 'file',
        maxBytes: 209715200,
        //allow: 'multipart/form-data',
        parse: true
      },
      handler: function(request, reply) {

        // TODO See example http://bl.ocks.org/joyrexus/0c6bd5135d7edeba7b87

        // request
        // .pipe(through2(function(buffer, encoding, next) {
        //   this.push(buffer.toString().toUpperCase());
        //   next();
        // }))
        // .pipe(fs.createWriteStream("vodoo"));
        request.payload.fileUpload.pipe(fs.createWriteStream('vodoo'));
      }
    }
  });

  next();
};


register.attributes = {
	name : 'photoApi',
	version : '1.0.0'
};

module.exports = register;
