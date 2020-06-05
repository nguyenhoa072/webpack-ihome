const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  mode: 'development',
  // entry: ["./src/js/app.js", "./src/scss/main.scss"],
  entry: {
    app: ['./src/js/app.js', './src/scss/main.scss'],
    account: ['./src/scss/home.scss']
  },
  module: {
    rules: [
      loaders.CSSLoader,
      loaders.JSLoader,
      loaders.HTMLoader,
      loaders.ImagesLoader,
      loaders.FontsLoader,
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    // quiet: true,
    contentBase: path.join(__dirname, 'src')
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  plugins: [
    plugins.WebpackDashboard,
    // plugins.BundleAnalyzerPlugin,
    plugins.CleanWebpackPlugin,
    plugins.ProvidePlugin,    
    plugins.StyleLintPlugin,
    plugins.MiniCssExtractPlugin,
  ].concat(plugins.HtmlPlugins),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[chunkhash].bundle.js",
    publicPath: '',
  },
};