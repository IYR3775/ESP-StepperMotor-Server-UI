const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    filenameHashing: false,
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        output: {
            filename: "js/[name].js",
            chunkFilename: "js/[name].js",
        },
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                test: /\.js(\?.*)?$/i,
                algorithm: 'gzip',
                threshold: 10240,
                minRatio: 0.8,
                deleteOriginalAssets: false
            })
        ]
    },
    // chainWebpack: config => {
    //     config.resolve
    //         .alias
    //         .set('numeric-keyboard$', 'numeric-keyboard/dist/numeric_keyboard.vue.js')
    //     // fix error above by excluding node_modules
    //     config.module
    //         .rule('js')
    //         .exclude
    //         .add(/node_modules/)
    //         .end()
    // },
    css: {
        extract: false,
    },
}