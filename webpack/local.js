let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let qpx = require('./qpx');
let cfg = require('../cfg/cfg');
let autoprefix = require('autoprefixer');
let path = require('path');

let {staticPath} = cfg;
let rootDir = path.resolve(__dirname, '..');

let webpackConfig = {
  output: {
    path: `${rootDir}/build`,
    publicPath: staticPath,
    filename: '[name].bundle.js',
  },
  entry: {
    index: ['webpack-hot-middleware/client', `${rootDir}/static/index.js`]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: `${rootDir}/static`,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            plugins: ['transform-runtime']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: `${rootDir}/static`,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              limit: 1
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        include: `${rootDir}/static`,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[local]--[hash:base64:8]'
            }
          },
          'stylus-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefix, qpx]
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.bundle.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {from: `${rootDir}/static/externals`, to: `${rootDir}/build/externals`}
    ]),
  ],
  devtool: 'cheap-module-eval-source-map'
};

module.exports = webpackConfig;
