const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackDashboard = require('webpack-dashboard/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 3000,
    quiet: true,
    contentBase: path.join(__dirname, 'src')
  },
  plugins: [
    new WebpackDashboard(), 
    new FriendlyErrorsWebpackPlugin(),
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, 'stylelint.config.js'),
      context: path.resolve(__dirname, './src/scss'),
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
    }),
  ]
})