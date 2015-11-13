'use strict';

var React = require('react');

var Default = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
          <title>Wedding.js</title>
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
        </head>
        <body style={{color: '#acacac'}}>
          <div id="app"></div>
          <script src="js/bundle.js"></script>
        </body>
      </html>
    );
  }
});

module.exports = Default;
