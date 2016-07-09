'use strict';

const async = require('async');
const PhotoMapUtil = require('server/lib/photoMapUtil');
const photoMapUtil = new PhotoMapUtil();

function PhotoSlideshow (photoMap) {
  this.lastPhotoId = '';
  this.photoMap = photoMap;
}

PhotoSlideshow.prototype.nextPhoto = function (cb) {
  const self = this;

  async.waterfall([
    // transform object to array
    function (cbAsync) {
      async.reduce(self.photoMap, [], (memo, value, cbAsyncReduce) => {
        memo.push(value);
        return cbAsyncReduce(null, memo);
      }, cbAsync);
    },
    // filter out photos that have already been seen
    function (photoArray, cbAsync) {
      async.filter(photoArray, (value, cbAsyncFilter) => {
        return cbAsyncFilter(null, !value.seen && self.lastPhotoId !== value.id);
      }, cbAsync);
    },
    // if filteredPhotoArray is empty, mark all as not being seen
    // if still has some left, pick a random number
    function (filteredPhotoArray, cbAsync) {
      if (filteredPhotoArray.length === 0) {
        return photoMapUtil.resetPhotos(self.photoMap, self.lastPhotoId, (err, newPhotoMap) => {
          if (err) {
            return cbAsync(err);
          }
          async.reduce(newPhotoMap, [], (memo, value, cbAsyncReduce) => {
            if (!value.seen) {
              memo.push(value);
            }
            return cbAsyncReduce(null, memo);
          }, cbAsync);
        });
      }
      return cbAsync(null, filteredPhotoArray);
    }
  ], (err, photoArray) => {
    if (err) {
      return cb(err);
    }
    photoMapUtil.pickRandomPhoto(photoArray, (err, nextPic) => {
      if (err) {
        return cb(err);
      }
      photoMapUtil.markPhoto(self.photoMap, nextPic, (err, newPhotoMap) => {
        if (err) {
          return cb(err);
        }
        self.lastPhotoId = nextPic.id;
        self.photoMap = newPhotoMap;
        return cb(null, nextPic);
      });
    });
  });
};

module.exports = PhotoSlideshow;
