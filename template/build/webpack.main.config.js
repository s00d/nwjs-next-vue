process.env.BABEL_ENV = 'main'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { label, dependencies } = require('../package')

const isProduction = process.env.NODE_ENV === 'production'

let config = {
  mode: process.env.NODE_ENV,
  devtool: '#cheap-module-eval-source-map',
  target: 'node-webkit',
  entry: {
    main: path.join(__dirname, '../src/main/main')
  },
  output: {
    path: path.join(__dirname, '../dist/main'),
    publicPath: '/build/',
    filename: '[name].js',
    chunkFilename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].js.map',
    libraryTarget: 'var',
  },
  externals: [
    // Externalize all dependencies inside of the application directory.
    function (context, request, callback) {
      if (dependencies && dependencies[request]) {
        return callback(null, 'commonjs ' + request)
      } else {
        callback()
      }
    }
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction
            }
          },
          sourceMap: !isProduction,
          extract: isProduction,
          cssSourceMap: !isProduction,
          cacheBusting: true,
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
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
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // you can also read from a file, e.g. `variables.scss`
              resources: path.resolve(__dirname, '../src/main/assets/styles/_variables.scss')
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      }
    ]
  },
  optimization: {
    minimizer: [],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, '../src/main'),
      'vue$': 'vue/dist/vue.esm.js',
      '@src': path.resolve(__dirname, '../src/'),
      '@root': path.resolve(__dirname, '../'),
      '@styles': path.resolve(__dirname, '../src/assets/styles/'),
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: label,
      debug: !isProduction,
      favicon: path.join(__dirname, '../src/main/favicon.ico'),
      filename: 'index.html',
      template: path.join(__dirname, '../src/main/home.ejs'),
      inject: false,
      hash: true,
      // minify: {
      //   collapseWhitespace: true,
      //   removeAttributeQuotes: true,
      //   removeComments: true
      // }
    }),
    new CopyWebpackPlugin([
      { from: './package.json', to: './dist' }
    ])
  ]
}

if (isProduction) {
  config.devtool = false
  config.plugins.push(
    new BabelMinifyWebpackPlugin({}, {
      comments: false
    }),
    // see: http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  )
}

module.exports = config
