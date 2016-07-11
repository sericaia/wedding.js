const path = require('path');
const webpack = require('webpack');

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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'WEDDING_JS_HOST': JSON.stringify(process.env.WEDDING_JS_HOST || '0.0.0.0'),
        'WEDDING_JS_PORT': JSON.stringify(process.env.WEDDING_JS_PORT || '3000')
      }
    })
  ]
};
