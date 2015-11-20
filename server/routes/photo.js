'use strict';

var Path = require('path');
var Joi = require('joi');
var through2 = require('through2');
var fs = require('fs');
var async = require('async');

var register = function (plugin, options, next) {
  plugin.route({
    method: 'GET',
    path: '/photo',
    handler: function(request, reply) {
      var path = 'data';
      fs.readdir(path, function(err, files){
        if (err || !files) {
          return reply().code(500); //TODO change to apropriate one
        }

        async.reduce(files, [], function(memo, filename, callback) {
          var isHidden = /^\./.test(filename);
          if (!isHidden) {
            memo.push(filename);
          }
          callback(null, memo);
        }, function(err, memo) {
          if (err || !memo.length) {
            return reply().code(500); //TODO change to apropriate one
          }

          return reply(memo);
        });
      });
    },
    config: {
      description: 'Return all photos',
      tags: ['get', 'photos']
    }
  });

  plugin.route({
    method: 'GET',
    path: '/photo/{photoPath*}',
    handler: {
      directory: {
        path: 'data',
        listing: false
      }
    },
    config: {
      description: 'Return photo',
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
      description: 'Add photo',
      tags: ['post', 'photo'],
      payload: {
        output: 'stream',
        maxBytes: 209715200,
        //allow: 'multipart/form-data',
        parse: true
      },
      handler: function(request, reply) {
        // NOTE this solution could be changed with https://www.npmjs.com/package/pump

        // get folder name
        var dataFolder = './data';
        var fileName = request.payload.fileUpload.hapi.filename;
        var path = Path.join(dataFolder, fileName);

        var write = function(buffer, encoding, next) {
          next(null, buffer);
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
