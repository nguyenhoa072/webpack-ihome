const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlPlugins = GenerateHtmlPlugins("./src/html/pages");

module.exports = {
    devtool: "source-map",
    entry: "./src/js/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].min.js",
        publicPath: "",
    },
    optimization: {
        splitChunks: {
            chunks: "initial",
            // minSize: 30000,
            // maxSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `${packageName.replace("@", "")}`;
                    },
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].min.css",
            chunkFilename: "[id].css",
        }),
    ].concat(htmlPlugins),
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            configFile: __dirname + "/.eslintrc",
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "html-loader",
                    options: {
                        interpolate: true,
                        minimize: false,
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: __dirname + "/postcss.config.js",
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            importLoaders: 3,
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                // exclude: /(node_modules|bower_components)/,
                exclude: [/font/, /fonts/],
                use: {
                    loader: "file-loader",
                    options: {
                        // ma hoa ten file
                        // name: "images/[folder]/[contenthash].[ext]"
                        name: "images/[folder]/[name].[ext]",
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                exclude: [/img/, "/images/"],
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "fonts",
                        name: "[name].[ext]",
                    },
                },
            },
        ],
    },
};

function GenerateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map((item) => {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            // inject: 'head',
            template: path.resolve(
                __dirname,
                `${templateDir}/${name}.${extension}`
            ),
        });
    });
}
