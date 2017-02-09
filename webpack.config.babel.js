export default {
    entry: './app/main.js',
    output: {
        filename: 'public/bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: "babel-loader"
            }
        ]
    }
}