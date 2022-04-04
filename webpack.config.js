/**
 * Prod Config
 */
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
  devServer: {
    contentBase: './dist',
  },
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'KombatJS',
    })
  ]
});
