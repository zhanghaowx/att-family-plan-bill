const path = require('path')
const webpack = require('webpack')
const ChromeReloadPlugin = require('wcer')

const {
  cssLoaders,
  htmlPage
} = require('./tools')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let page = dir => path.join(__dirname, '..', 'pages', dir)
let resolve = dir => path.join(__dirname, '..', 'src', dir)
module.exports = {
  entry: {
    popup: page('./popup'),
    options: page('./options'),
    background: page('./background')
  },
  output: {
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[name].js?[hash]',
    library: '[name]'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      src: resolve('./'),
      popup: resolve('./popup'),
      options: resolve('./options'),
      background: resolve('./background')
    }
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: true,
        loaders: {
          ...cssLoaders(),
          js: {
            loader: 'babel-loader'
          }
        },
        transformToRequire: {
          video: 'src',
          source: 'src',
          img: 'src',
          image: 'xlink:href'
        }
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
    ]
  },
  plugins: [
    htmlPage('New Search', 'popup', ['popup']),
    htmlPage('Options', 'options', ['options']),
    htmlPage('background', 'background', ['background']),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '..', 'static')
    }]),
    new CopyWebpackPlugin([{
      from: path.join(page('./inject'), 'inject.js'), to: 'js'
    }]),
    // new ChromeReloadPlugin({
    //   port: 9090,
    //   manifest: path.join(__dirname, '..', 'src', 'manifest.js')
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ],
  performance: {
    hints: false
  }
}

// disable wcer on macos after manifest.js is generated
