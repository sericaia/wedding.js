'use strict';

const async = require('async');

function PhotoMapUtil () {}

PhotoMapUtil.prototype.addPhoto = function (photoMap, photoInfo, cb) {
  if (photoMap[photoInfo.id]) {
    return cb(null, photoMap);
  }
  const newPhoto = Object.assign({}, photoInfo, { seen: false });
  const newPhotoMap = Object.assign({}, photoMap);
  newPhotoMap[photoInfo.id] = newPhoto;
  return cb(null, newPhotoMap);
};

PhotoMapUtil.prototype.markPhoto = function (photoMap, photoInfo, cb) {
  if (!photoMap[photoInfo.id]) {
    return cb(new Error('Photo not found, add it first: ' + photoInfo.id));
  }
  const newPhotoMap = Object.assign({}, photoMap);
  newPhotoMap[photoInfo.id].seen = true;
  return cb(null, newPhotoMap);
};

PhotoMapUtil.prototype.resetPhotos = function (photoMap, lastPhotoId, cb) {
  async.reduce(photoMap, {}, (memo, value, cbAsync) => {
    if (value.id !== lastPhotoId) {
      value.seen = false;
    }
    memo[value.id] = value;
    return cbAsync(null, memo);
  }, cb);
};

PhotoMapUtil.prototype.pickRandomPhoto = function (photoArray, cb) {
  return cb(null, photoArray[Math.floor(Math.random() * photoArray.length)]);
};

module.exports = PhotoMapUtil;
