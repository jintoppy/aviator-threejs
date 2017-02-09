export default {
    entry: './app/main.js',
    output: {
        filename: 'public/bundle.js'
    },
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