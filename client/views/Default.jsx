'use strict';

const React = require('react');

const Default = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <meta charSet='utf-8'></meta>
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'></meta>
          <title>
            Wedding.js
          </title>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' />
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css' />
        </head>
        <body>
          <div id='app'></div>
          <script src='js/bundle.js'></script>
        </body>
      </html>
    );
  }
});

module.exports = Default;