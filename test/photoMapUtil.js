'use strict';

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var async = require('async');
var photoMapUtil = require('lib/photoMapUtil');

lab.experiment('Photo Map Util', function () {

  lab.test('add photo to empty map', function (done) {
    photoMapUtil.addPhoto({}, {id: 'photo1', name: 'photoName1', seen: false}, function(err, photoMap){
      Code.expect(err).to.be.null();
      Code.expect(Object.keys(photoMap).length).to.equal(1);
      Code.expect(Object.keys(photoMap).indexOf('photo1')).to.equal(0);
      Code.expect(photoMap.photo1.name).to.equal('photoName1');
      Code.expect(photoMap.photo1.seen).to.equal(false);
      Code.expect(photoMap.photo1.id).to.equal('photo1');
      done();
    });
  });

  lab.test('add photo already present', function (done) {
    photoMapUtil.addPhoto({photo1:{name:'photoName1', seen:false, id:'photo1'}}, {id: 'photo1', name: 'photoName1'}, function(err, photoMap){
      Code.expect(err).to.be.null();
      Code.expect(Object.keys(photoMap).length).to.equal(1);
      Code.expect(Object.keys(photoMap).indexOf('photo1')).to.equal(0);
      Code.expect(photoMap.photo1.name).to.equal('photoName1');
      Code.expect(photoMap.photo1.seen).to.equal(false);
      Code.expect(photoMap.photo1.id).to.equal('photo1');
      done();
    });
  });

  lab.test('mark unexistent photo', function (done) {
    photoMapUtil.markPhoto({}, {id: 'photo1', name: 'photoName1'}, function(err, photoMap){
      Code.expect(err).to.not.be.null();
      Code.expect(err.message).to.equal('Photo not found, add it first: photo1');
      done();
    });
  });

  lab.test('mark photo', function (done) {
    photoMapUtil.markPhoto({photo1:{name:'photoName1', seen:false, id:'photo1'}}, {id: 'photo1', name: 'photoName1'}, function(err, photoMap){
      Code.expect(err).to.be.null();
      Code.expect(Object.keys(photoMap).length).to.equal(1);
      Code.expect(Object.keys(photoMap).indexOf('photo1')).to.equal(0);
      Code.expect(photoMap.photo1.name).to.equal('photoName1');
      Code.expect(photoMap.photo1.seen).to.equal(true);
      Code.expect(photoMap.photo1.id).to.equal('photo1');
      done();
    });
  });


  lab.test('reset photo', function (done) {
    var lastPhoto = {};
    photoMapUtil.resetPhotos({photo1:{name:'photoName1', seen:true, id:'photo1'}}, lastPhoto, function(err, photoMap){
      Code.expect(err).to.be.null();
      async.forEachOf(photoMap, function(value, key, cbAsync){
        if (value === lastPhoto) {
          Code.expect(value.seen).to.equal(true);
        }
        else {
          Code.expect(value.seen).to.equal(false);
        }
        cbAsync();
      }, function(err, results){
        Code.expect(Object.keys(photoMap).length).to.equal(1);
        Code.expect(Object.keys(photoMap).indexOf('photo1')).to.equal(0);
        done();
      });
    });
  });

  lab.test('pick random photo', function (done) {
    var photoMapArray = [{name:'photoName1', seen:true, id:'photo1'}];
    photoMapUtil.pickRandomPhoto(photoMapArray, function(err, photo){
      Code.expect(err).to.be.null();
      Code.expect(photoMapArray.indexOf(photo)).to.not.equal(-1);
      done();
    });
  });

});
