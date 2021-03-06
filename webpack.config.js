const path = require('path');
const entry = require('webpack-glob-entry');

module.exports = {
  entry: entry(path.resolve(__dirname, 'app', 'components', '*.js')),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'scripts'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: { loader: 'babel-loader' },
    }],
  },
};
