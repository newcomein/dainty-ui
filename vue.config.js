const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    productionSourceMap: false,
    // chainWebpack: config => {
    //     config.module
    //         .rule('svg')
    //         .exclude.add(resolve('src/assets/svgIcons'))
    //         .end()
    //     config.module
    //         .rule('svg1')
    //         .test(/\.svg$/)
    //         .use('svg-sprite')
    //         .loader('svg-sprite-loader')
    //         .options({
    //             symbolId: 'iconfont-[name]',
    //             plainSprite: true,
    //         })
    //         .end()
    //         .include.add(resolve('src/assets/svgIcons'))
    //         .end()
    // },
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
