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
        output: 'stream',
        maxBytes: 209715200,
        //allow: 'multipart/form-data',
        parse: true
      },
      handler: function(request, reply) {

        // get folder name
        var dataFolder = './data';
        var fileName = request.payload.fileUpload.hapi.filename;
        var path = Path.join(dataFolder, fileName);

        var write = function(buffer, encoding, next) {
          this.push(buffer);
          next();
        };

        var end = function(next) {
          reply();
          next();
        };
        
        // pipe data into data folder
        request.payload.fileUpload
        .pipe(through2(write, end))
        .pipe(fs.createWriteStream(path));
      },
      validate: {
        payload: {
          fileUpload: Joi.required()
        }
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
