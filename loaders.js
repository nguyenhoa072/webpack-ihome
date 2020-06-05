const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const JSLoader = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  // exclude: /(node_modules|bower_components)/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    },
    {
      loader: 'eslint-loader',
      options: {
        configFile: __dirname + '/.eslintrc'
      },
    }
  ]
};

const HTMLoader = {
  test: /\.html$/,
  exclude: /node_modules/,
  use: {
    loader: 'html-loader',
    options: {
      interpolate: true,
      minimize: false,
    }
  }
};

const CSSLoader = {
  test: /\.(sa|sc|c)ss$/,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
        sourceMap: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: true
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: __dirname + '/postcss.config.js'
        },
        sourceMap: true
      },
    },
    {
      loader: 'sass-loader',
      options: {
        importLoaders: 3,
        sourceMap: true
      },
    }
  ]
};

const ImagesLoader = {
  test: /\.(png|svg|jpg|gif)$/,
  use: {
    loader: 'file-loader',
    options: {
      outputPath: (url, resourcePath, context) => {
        if (/favicons/.test(resourcePath)) {
          return `images/favicons/${url}`;
        }
        if (/background/.test(resourcePath)) {
          return `images/background/${url}`;
        }
        if (/home/.test(resourcePath)) {
          return `images/home/${url}`;
        }
        if (/about/.test(resourcePath)) {
          return `images/about/${url}`;
        }     
        return `images/orther/${url}`;
      },
      name: '[name].[ext]',
    }
  }
};

const FontsLoader = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: {
    loader: 'file-loader',
    options: {
      outputPath: 'fonts',
      name: '[name].[ext]',
    }
  }
};

module.exports = {
  JSLoader: JSLoader,
  HTMLoader: HTMLoader,
  CSSLoader: CSSLoader,
  ImagesLoader: ImagesLoader,
  FontsLoader: FontsLoader
};