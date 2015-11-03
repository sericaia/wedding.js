'use strict';

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var async = require('async');
var PhotoSlideshow = require('lib/photoSlideshow');
var photoMapUtil = require('lib/photoMapUtil');


lab.experiment('Photo Slideshow', function () {

  lab.test('slideshow with one photo', function (done) {
    photoMapUtil.addPhoto({}, {id: 'photo1', name: 'photoName1', seen: true}, function(err, photoMap){
      var ps = PhotoSlideshow(photoMap);
      ps.nextPhoto(function(err, photo){
        Code.expect(err).to.be.null();
        Code.expect(photo.name).to.equal('photoName1');
        Code.expect(photo.seen).to.equal(true);
        Code.expect(photo.id).to.equal('photo1');
        done();
      });
    });
  });

  lab.test('slideshow with two photos', function (done) {
    photoMapUtil.addPhoto({}, {id: 'photo1', name: 'photoName1',seen: false}, function(err, photoMap) {
      photoMapUtil.addPhoto(photoMap, {id: 'photo2', name: 'photoName2', seen: false}, function(err, nPhotoMap) {

        var ps = PhotoSlideshow(nPhotoMap);
        var i = 0;
        var lastPhoto = {};
        async.whilst(
          function(){ return i < 5; },
          function(cbAsync){
            ps.nextPhoto(function(err, photo){
              Code.expect(err).to.be.null();
              Code.expect(photo).not.to.equal(lastPhoto);
              lastPhoto = photo;
              ++i;
              cbAsync();
            });
          },
          function(err){
            Code.expect(err).to.be.null();
            done();
        });
      });
    });
  });

});
