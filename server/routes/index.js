'use strict';

const photoRoute = require('server/routes/photos');
const common = require('server/routes/commons');

module.exports = [
  common,
  photoRoute
];
