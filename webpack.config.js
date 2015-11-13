module.exports = {
  entry: './client/js/components/Index.jsx',
  output: {
    path: __dirname + '/client/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query:
        {
          presets:['es2015', 'react']
        }
      }
    ]
  },
};
