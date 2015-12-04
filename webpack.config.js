var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');

module.exports = {
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  entry: './client/js/components/Index.jsx',
  output: {
    path: __dirname + '/client/js',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: __dirname + '/client',
        exclude: /bundle\.js$/
      }
    ],
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query:
        {
          presets:['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'localhost:8000'
    })
  ]
};
