const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    productionSourceMap: false,
    configureWebpack: (config) => {
        let _config = {};
        if (process.env.NODE_ENV === "production") {

            _config = {
                optimization: {
                    minimizer: [
                        new UglifyJsPlugin({
                            cache: true,
                            parallel: true
                        }),
                        new TerserPlugin({
                            cache: true,
                            parallel: true,
                            extractComments: true
                        })
                    ]
                },
                plugins: [new MinifyPlugin(), new MiniCssExtractPlugin()],
            }

        }
        return _config
    }
}
;