const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client', 'js', 'components', 'Index.jsx'),
  output: {
    path: path.join(__dirname, 'client', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
