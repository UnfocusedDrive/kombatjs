/**
 * Lib Config
 */
const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
  devServer: {
    contentBase: './lib',
  },
  entry: './src/export.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      name:'kombatjs',
      type: 'umd'
    }
  }
});
