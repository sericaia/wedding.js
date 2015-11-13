var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
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

// module.exports = {
//   entry: './client/js/components/Index.jsx',
//   output: {
//     path: __dirname + '/client/js',
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel',
//         query:
//         {
//           presets:['es2015', 'react']
//         }
//       }
//     ]
//   },
// };
