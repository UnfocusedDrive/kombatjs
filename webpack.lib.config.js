const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const commonConfig = require('./webpack.config');

// module.exports = (env) => {
//   const config = require('./config/webpack.' + env); //[3]
//   return merge(commonConfig, config); //[4]
// };


module.exports = merge(commonConfig, {
  devServer: {
    contentBase: './lib',
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      name:'kombatjs',
      type: 'umd'
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
})

// module.exports = {
//   devServer: {
//     contentBase: './lib',
//   },
//   entry: './src/export.js',
//   output: {
//     path: path.resolve(__dirname, 'lib'),
//     filename: 'index.js',
//     library: {
//       name:'kombatjs',
//       type: 'umd'
//     }
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$|\.jsx$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           "style-loader",
//           "css-loader",
//           "sass-loader"
//         ],
//       },
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/,
//         use: [
//           'file-loader'
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin()
//   ]
// };