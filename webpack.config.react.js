const path = require('path');


module.exports = function () {
    return {
        entry: {
            'buyer-react': './src/js/buyer-react.js',
            'seller-react': './src/js/seller-react.js',
        },
        output: {
            filename: '[name].js',
            publicPath: '/build/',
            path: path.resolve(__dirname, 'build')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
            ]
        },
        watch: true,
        externals: {
            "react": "React",
        },
    }
};