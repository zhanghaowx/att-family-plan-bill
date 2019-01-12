const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const { styleLoaders } = require('./tools')
module.exports = merge(baseWebpack, {
  devtool: '#cheap-module-eval-source-map',
  module: {
    // TODO: extract-text-webpack-plugin doesn't work well in prd
    rules: styleLoaders({ extract: false, sourceMap: true })
  },
  plugins: [
    new CleanWebpackPlugin(['build/*.*']),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  ]
})
