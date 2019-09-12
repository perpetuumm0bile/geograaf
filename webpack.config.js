path = require('path');

module.exports = {
    entry: ['babel-polyfill', path.resolve(__dirname,'src/index.js')],
    output: {
        path: path.resolve(__dirname, 'public/scripts/'),
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader',
                options:{
                    presets: ['env']
                }
            }
        }]

    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        watchContentBase: true
        // publicPath: '/scipts/'

    },
    devtool:'source-map',

    watch:true
}
