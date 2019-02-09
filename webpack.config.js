const path = require('path');
const glob = require("glob");

module.exports = {
  entry: glob.sync(path.resolve(__dirname, 'app', '*.js')),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {loader: 'babel-loader'}
    }]
  }
};
