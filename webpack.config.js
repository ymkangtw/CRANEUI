var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './main.jsx',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin([
            "//",
            "// CRANE UI v1.0.0",
            "//",
            "//"
        ].join("\n"), { raw: true }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    //resolve: {
    //    modulesDirectories: ['node_modules'],
    //    alias: {},
    //    extensions: ['', '.jsx', '.js']
    //},
    module: {
        loaders: [
            //{test: /\.jsx?$/, loader: 'babel'}        // need .babelrc, {"presets" : ["es2015", "react"]},
            //{test: /\.jsx?$/, loader: 'babel-loader', query: {presets: ['es2015', 'react']}},     // valid for webpack, fail for webpack-dev-server
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015', 'react']}},
            {test: /\.css$/, loader: 'style-loader!css-loader'}

        ]
    }
};
