'use strict';

const Joi = require('joi');

const methods = require('server/routes/photos/methods');
const handlers = {};

handlers.getPhotos = {
  handler: methods.getPhotos,
  description: 'Return all photos',
  tags: ['get', 'photos']
};

handlers.getPhotoByID = {
  validate: {
    params: {
      photoPath: Joi.string().min(4).required()
    }
  },
  handler: methods.getPhotoByID,
  description: 'Return photo',
  notes: 'The photoPath is mandatory',
  tags: ['get', 'photos']
};

handlers.postPhoto = {
  validate: {
    payload: {
      fileUpload: Joi.required()
    }
  },
  handler: methods.postPhoto,
  description: 'Add photo',
  tags: ['post', 'photo'],
  payload: {
    output: 'stream',
    maxBytes: 209715200,
    // allow: 'multipart/form-data',
    parse: true
  }
};

module.exports = handlers;
