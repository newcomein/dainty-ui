const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
module.exports = {
    productionSourceMap: false,
    configureWebpack: (config) => {
        let _config = {};
        if (process.env.NODE_ENV === "production") {

            _config = {
                optimization: {
                    minimizer: [
                        new TerserPlugin({
                            cache: true,
                            parallel: true,
                            extractComments: true,
                        }),
                        new UglifyJsPlugin({
                            cache: true,
                            parallel: true
                        }),
                    ]
                },
                plugins: [new WebpackDeepScopeAnalysisPlugin(), new MinifyPlugin()],
            }

        }
        return _config
    }
}
;
