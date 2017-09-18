let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let qpx = require('./qpx');
let cfg = require('../cfg/cfg');
let autoprefix = require('autoprefixer');
let path = require('path');
let WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
let webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./isomorphic'));
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractStylus = new ExtractTextPlugin('[name].[contenthash:8].css');
let rootDir = path.resolve(__dirname, '..');
let {staticPath} = cfg;

let webpackConfig = {
  output: {
    path: `${rootDir}/build`,
    publicPath: staticPath,
    filename: '[name].[chunkhash:8].js',
  },
  entry: {
    index: [`${rootDir}/static/index.js`]
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
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=1'
      },
      {
        test: /\.styl$/,
        use: extractStylus.extract([
          {
            loader: 'css-loader',
            options: {
              module: true,
              minimize: true,
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
        ])
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[chunkhash:8].js'
    }),
    extractStylus,
    new CopyWebpackPlugin([
      {from: `${rootDir}/static/externals`, to: `${rootDir}/build/externals`}
    ]),
    webpackIsomorphicToolsPlugin,

  ]
};

module.exports = webpackConfig;
