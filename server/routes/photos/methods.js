'use strict';

const Path = require('path');
const through2 = require('through2');
const fs = require('fs');
const async = require('async');

const methods = {};

methods.getPhotos = function (request, reply) {

    const path = 'data';
    fs.readdir(path, (err, files) => {

        if (err || !files) {
            return reply().code(500); //TODO change to apropriate one
        }

        async.reduce(files, [], (memo, filename, callback) => {

            const isHidden = /^\./.test(filename);
            if (!isHidden) {
                memo.push(filename);
            }
            return callback(null, memo);
        }, (err, memo) => {

            if (err) {
                return reply().code(500); //TODO change to apropriate one
            }

            return reply(memo);
        });
    });
};

methods.getPhotoByID = {
    directory: {
        path: 'data',
        listing: false
    }
};


methods.postPhoto = function (request, reply) {
  // NOTE this solution could be changed with https://www.npmjs.com/package/pump

  // get folder name
    const dataFolder = './data';
    const fileName = request.payload.fileUpload.hapi.filename;
    const path = Path.join(dataFolder, fileName);

    const write = function (buffer, encoding, next) {

        return next(null, buffer);
    };

    const end = function (next) {

        reply();
        next();
    };

    // pipe data into data folder
    request.payload.fileUpload
        .pipe(through2(write, end))
        .pipe(fs.createWriteStream(path));
};

module.exports = methods;
