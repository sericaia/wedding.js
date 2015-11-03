'use strict';

var async = require('async');
var _ = require('lodash');
var photoMapUtil = require('lib/photoMapUtil');

var PhotoSlideshow = function(photoMap){
  var lastPhotoId = '';

  var nextPhoto = function(cb){
    async.waterfall([
      // transform object to array
      function(cbAsync){
        async.reduce(photoMap, [], function(memo, value, cbAsyncReduce){
          memo.push(value);
          cbAsyncReduce(null, memo);
        }, cbAsync);
      },
      // filter out photos that have already been seen
      function(photoArray, cbAsync){
        async.filter(photoArray, function(value, cbAsyncFilter){
          cbAsyncFilter(!value.seen && lastPhotoId !== value.id);
        }, function(filteredPhotoArray){
          cbAsync(null, filteredPhotoArray);
        });
      },
      // if filteredPhotoArray is empty, mark all as not being seen
      // if still has some left, pick a random number
      function(filteredPhotoArray, cbAsync){
        if (filteredPhotoArray.length === 0) {
          return photoMapUtil.resetPhotos(photoMap, lastPhotoId, function(err, newPhotoMap){
            if (err) {
              return cbAsync(err);
            }
            async.reduce(newPhotoMap, [], function(memo, value, cbAsyncReduce){
              if (!value.seen) {
                memo.push(value);
              }
              cbAsyncReduce(null, memo);
            }, cbAsync);
          });
        }
        cbAsync(null, filteredPhotoArray);
      }
    ], function(err, photoArray){
      if (err) {
        return cb(err);
      }
      photoMapUtil.pickRandomPhoto(photoArray, function(err, nextPic){
        photoMapUtil.markPhoto(photoMap, nextPic, function(err, newPhotoMap){
          lastPhotoId = nextPic.id;
          photoMap = newPhotoMap;
          cb(null, nextPic);
        });
      });
    });
  };

  return {
    nextPhoto: nextPhoto
  };
};

module.exports = PhotoSlideshow;
