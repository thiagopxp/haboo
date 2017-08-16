import * as webpack from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
const PathOverridePlugin = require('./tools/replace-path');

var envIndex = process.argv.indexOf("--env");
const env = (envIndex == -1 ? "dev" : process.argv[++envIndex]);

const config: webpack.Configuration = {
    entry: [
        "react-hot-loader/patch",
        "./src/index.tsx",
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        alias: { 
            "@haboo/sdk": path.resolve(__dirname, './src/sdk')
        }
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
        new PathOverridePlugin(/config\/config.dev/, `config/config.${env}`),
        new HtmlWebpackPlugin({
                title: 'haboo',
                chunksSortMode: 'dependency',
                template: path.resolve(__dirname, './src/index.html')
            }),
    ],

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loaders: [
                    "react-hot-loader/webpack",
                    "awesome-typescript-loader"
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: [path.resolve(__dirname, "src")],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true
                        }
                    }
                ]
            }
        ]
    },

    devServer: {
        hot: true
    }

};

export default config;
