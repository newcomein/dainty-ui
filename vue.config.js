const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    productionSourceMap: false,
    configureWebpack: (config) => {
        let _config = {};
        if (process.env.NODE_ENV === "production") {

            _config = {
                optimization: {
                    minimizer: [new UglifyJsPlugin({
                        cache: true,
                        parallel: true
                    })]
                },
                plugins: [new MinifyPlugin()],
            }

        }
        return _config
    }
}
;