import * as webpack from "webpack";
const htmlWebPackPlugin = require("html-webpack-plugin");

const configuration: webpack.Configuration = {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules$/,
                use: 'ts-loader',
            }
        ],
    },
    resolve: {
        extensions: [ '.js', '.tsx', '.ts', ".css"],
    },
    plugins: [
        new htmlWebPackPlugin({
            template: "./src/index.html"
        })
    ]
}

export default configuration;