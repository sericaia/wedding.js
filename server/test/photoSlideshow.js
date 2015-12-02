'use strict';

const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const async = require('async');
const PhotoSlideshow = require('server/lib/photoSlideshow');
const PhotoMapUtil = require('server/lib/photoMapUtil');
const photoMapUtil = new PhotoMapUtil();

lab.experiment('Photo Slideshow', () => {

    lab.test('slideshow with one photo', (done) => {

        photoMapUtil.addPhoto({}, { id: 'photo1', name: 'photoName1', seen: true }, (err, photoMap) => {

            Code.expect(err).to.be.null();
            const ps = new PhotoSlideshow(photoMap);
            ps.nextPhoto((err, photo) => {

                Code.expect(err).to.be.null();
                Code.expect(photo.name).to.equal('photoName1');
                Code.expect(photo.seen).to.equal(true);
                Code.expect(photo.id).to.equal('photo1');
                done();
            });
        });
    });

    lab.test('slideshow with two photos', (done) => {

        photoMapUtil.addPhoto({}, { id: 'photo1', name: 'photoName1',seen: false }, (err, photoMap) => {

            Code.expect(err).to.be.null();
            photoMapUtil.addPhoto(photoMap, { id: 'photo2', name: 'photoName2', seen: false }, (err, nPhotoMap) => {

                Code.expect(err).to.be.null();
                const ps = new PhotoSlideshow(nPhotoMap);
                let i = 0;
                let lastPhoto = {};
                async.whilst(
                    () => {

                        return i < 5;
                    },
                    (cbAsync) => {

                        ps.nextPhoto((err, photo) => {

                            Code.expect(err).to.be.null();
                            Code.expect(photo).not.to.equal(lastPhoto);
                            lastPhoto = photo;
                            ++i;
                            cbAsync();
                        });
                    },
                    (err) => {

                        Code.expect(err).to.be.null();
                        done();
                    }
                );
            });
        });
    });
});
