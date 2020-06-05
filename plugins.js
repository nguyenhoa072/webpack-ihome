const path = require('path');
const _WebpackDashboard = require('webpack-dashboard/plugin');
const _BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _StyleLintPlugin = require('stylelint-webpack-plugin');
const _HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs')

function GenerateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new _HtmlWebpackPlugin({
      filename: `${name}.html`,
      // inject: 'head',
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}

module.exports = {
  WebpackDashboard: new _WebpackDashboard(),
  BundleAnalyzerPlugin: new _BundleAnalyzerPlugin(),
  CleanWebpackPlugin: new CleanWebpackPlugin(),
  HtmlPlugins: GenerateHtmlPlugins('./src/html/template'),
  MiniCssExtractPlugin: new _MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash].bundle.css',
    chunkFilename: '[id].css'
  }),
  StyleLintPlugin: new _StyleLintPlugin({
    configFile: path.resolve(__dirname, 'stylelint.config.js'),
    context: path.resolve(__dirname, './src/scss'),
    files: '**/*.scss',
    failOnError: false,
    quiet: false,
  }),  
  ProvidePlugin: new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
};