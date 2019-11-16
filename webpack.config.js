const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: {
        buyer: './src/js/buyer.js',
        seller: './src/js/seller.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    plugins: [
        // Copy our app's index.html to the build folder.
        new CopyWebpackPlugin([
            {from: './src/seller.html', to: "seller.html"},
            {from: './src/buyer.html', to: "buyer.html"}
        ])
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
        loaders: [
            {test: /\.json$/, use: 'json-loader'},
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env', '@babel/react'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    }
}