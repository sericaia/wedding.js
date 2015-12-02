'use strict';

const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const async = require('async');
const PhotoMapUtil = require('server/lib/photoMapUtil');
const photoMapUtil = new PhotoMapUtil();

lab.experiment('Photo Map Util', () => {

    lab.test('add photo to empty map', (done) => {

        photoMapUtil.addPhoto({}, { id: 'photo1', name: 'photoName1', seen: false }, (err, photoMap) => {

            Code.expect(err).to.be.null();
            Code.expect(Object.keys(photoMap).length).to.equal(1);
            Code.expect(Object.keys(photoMap).indexOf('photo1')).to.equal(0);
            Code.expect(photoMap.photo1.name).to.equal('photoName1');
            Code.expect(photoMap.photo1.seen).to.equal(false);
            Code.expect(photoMap.photo1.id).to.equal('photo1');
            return done();
        });
    });

    lab.test('add photo already present', (done) => {

        photoMapUtil.addPhoto({ photo1:{ name:'photoName1', seen:false, id:'photo1' } }, { id: 'photo1', name: 'photoName1' }, (err, photoMap) => {

            Code.expect(err).to.be.null();
            Code.expect(Object.keys(photoMap).length).to.equal(1);
            Code.expect(Object.keys(photoMap).indexOf('photo1')).to.equal(0);
            Code.expect(photoMap.photo1.name).to.equal('photoName1');
            Code.expect(photoMap.photo1.seen).to.equal(false);
            Code.expect(photoMap.photo1.id).to.equal('photo1');
            return done();
        });
    });

    lab.test('mark unexistent photo', (done) => {

        photoMapUtil.markPhoto({}, { id: 'photo1', name: 'photoName1' }, (err, photoMap) => {

            Code.expect(err).to.not.be.null();
            Code.expect(err.message).to.equal('Photo not found, add it first: photo1');
            return done();
        });
    });

    lab.test('mark photo', (done) => {

        photoMapUtil.markPhoto({ photo1:{ name:'photoName1', seen:false, id:'photo1' } }, { id: 'photo1', name: 'photoName1' }, (err, photoMap) => {

            Code.expect(err).to.be.null();
            Code.expect(Object.keys(photoMap).length).to.equal(1);
            Code.expect(Object.keys(photoMap).indexOf('photo1')).to.equal(0);
            Code.expect(photoMap.photo1.name).to.equal('photoName1');
            Code.expect(photoMap.photo1.seen).to.equal(true);
            Code.expect(photoMap.photo1.id).to.equal('photo1');
            return done();
        });
    });


    lab.test('reset photo', (done) => {

        const lastPhoto = {};
        photoMapUtil.resetPhotos({ photo1:{ name:'photoName1', seen:true, id:'photo1' } }, lastPhoto, (err, photoMap) => {

            Code.expect(err).to.be.null();
            async.forEachOf(photoMap, (value, key, cbAsync) => {

                if (value === lastPhoto) {
                    Code.expect(value.seen).to.equal(true);
                }
                else {
                    Code.expect(value.seen).to.equal(false);
                }
                return cbAsync();
            }, (err, results) => {

                Code.expect(err).to.be.null();
                Code.expect(Object.keys(photoMap).length).to.equal(1);
                Code.expect(Object.keys(photoMap).indexOf('photo1')).to.equal(0);
                return done();
            });
        });
    });

    lab.test('pick random photo', (done) => {

        const photoMapArray = [{ name:'photoName1', seen:true, id:'photo1' }];
        photoMapUtil.pickRandomPhoto(photoMapArray, (err, photo) => {

            Code.expect(err).to.be.null();
            Code.expect(photoMapArray.indexOf(photo)).to.not.equal(-1);
            return done();
        });
    });
});
