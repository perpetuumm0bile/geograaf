path = require('path');

module.exports = {
    entry: ['babel-polyfill', path.resolve(__dirname,'src/index.js')],
    output: {
        path: path.resolve(__dirname, 'public/scripts/'),
        // path: '/home/sm/Documents/JS_project/geograaf/public/scripts',
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
        // contentBase: '/home/sm/Documents/JS_project/geograaf/public',
        publicPath: '/scipts/'

    },
    devtool:'source-map',

    watch:true
}
