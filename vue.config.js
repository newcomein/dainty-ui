const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        // optimization: {
        //     minimizer: [new UglifyJsPlugin({
        //         cache: true,
        //         parallel: true
        //     })]
        // },
        // plugins: [new MinifyPlugin()],
    }
};