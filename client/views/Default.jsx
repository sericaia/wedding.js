'use strict';

import React from 'react';
import defaults from '../../config/defaults';

const Default = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <meta charSet='utf-8'></meta>
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'></meta>
          <title>
            {defaults.pageTitle}
          </title>
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' />
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css' />
          <link rel='shortcut icon' href='/assets/logotipo.ico' />
        </head>
        <body style={{backgroundColor: defaults.colors.main}}>
          <div id='app'></div>
          <script src='js/bundle.js'></script>
        </body>
      </html>
    );
  }
});

module.exports = Default;
