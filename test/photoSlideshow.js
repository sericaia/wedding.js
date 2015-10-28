var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var async = require('async');
var PhotoSlideshow = require('lib/photoSlideshow');
var photoMapUtil = require('lib/photoMapUtil');


lab.experiment('Photo Slideshow', function () {

  lab.test('slideshow with one photo', function (done) {
    photoMapUtil.addPhoto({}, {id: 'photo1', name: 'photoName1', id:'photo1'}, function(err, photoMap){
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

  // FIXME
  lab.test('slideshow with two photos', function (done) {
    photoMapUtil.addPhoto({}, {id: 'photo1', name: 'photoName1', id:'photo1'}, function(err, photoMap){
      photoMapUtil.addPhoto({}, {id: 'photo2', name: 'photoName2', id:'photo2'}, function(err, photoMap){
        var ps = PhotoSlideshow(photoMap);
        var i = 0;
        async.whilst(
          function(){ return i < 4 },
          function(cbAsync){
            ps.nextPhoto(function(err, photo){
              Code.expect(err).to.be.null();
              if (i % 2 === 0) {
                console.log(i);
                Code.expect(photo.name).to.equal('photoName2');
                Code.expect(photo.seen).to.equal(false);
                Code.expect(photo.id).to.equal('photo2');
              }
              if (i % 2 === 1) {
                console.log(i);
                Code.expect(photo.name).to.equal('photoName1');
                Code.expect(photo.seen).to.equal(false);
                Code.expect(photo.id).to.equal('photo1');
              }
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
