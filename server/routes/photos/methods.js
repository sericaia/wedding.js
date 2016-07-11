'use strict';

const path = require('path');
const through2 = require('through2');
const fs = require('fs');

const methods = {};

methods.getPhotos = function (request, reply) {
  fs.readdir('data', (err, files) => {
    if (err || !files) {
      return reply().code(500); // TODO change to apropriate one
    }
    return reply(files);
  });
};

methods.getPhotoByID = {
  directory: {
    path: 'data',
    listing: false
  }
};

methods.postPhoto = function (request, reply) {
  const dataFolder = './data';
  const fileName = request.payload.fileUpload.hapi.filename;
  const path2 = path.join(dataFolder, fileName);

  function write (buffer, encoding, next) {
    return next(null, buffer);
  }

  function end (next) {
    reply();
    next();
  }

  // pipe data into data folder
  request.payload.fileUpload
    .pipe(through2(write, end))
    .pipe(fs.createWriteStream(path2));

  request.server.publish('/photos', fileName);
};

module.exports = methods;
