var async = require('async');
var _ = require('lodash');

var photoMapUtil = function(){
  var addPhoto = function(photoMap, photoInfo, cb){
    if (photoMap[photoInfo.id]){
      return cb(null, photoMap);
    }
    var newPhoto = _.assign({}, photoInfo, {seen: false});
    var newPhotoMap = _.assign({}, photoMap);
    newPhotoMap[photoInfo.id] = newPhoto;
    cb(null, newPhotoMap);
  };

  var markPhoto = function(photoMap, photoInfo, cb){
    if (!photoMap[photoInfo.id]){
      return cb(new Error('Photo not found, add it first: ' + photoInfo.id));
    }
    var newPhotoMap = _.assign({}, photoMap);
    newPhotoMap[photoInfo.id].seen = true;
    cb(null, newPhotoMap);
  };

  var resetPhotos = function(photoMap, lastPhotoId, cb){
    async.reduce(photoMap, {}, function(memo, value, cbAsync){
      if (value.id !== lastPhotoId) {
        value.seen = false;
      }
      memo[value.id] = value;
      cbAsync(null, memo);
    }, cb);
  };

  var pickRandomPhoto = function(photoArray, cb){
    return cb(null, photoArray[Math.floor(Math.random() * photoArray.length)]);
  }

  return {
    addPhoto: addPhoto,
    markPhoto: markPhoto,
    resetPhotos: resetPhotos,
    pickRandomPhoto: pickRandomPhoto
  }
};


module.exports = photoMapUtil();
