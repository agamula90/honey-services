import * as webpack from "webpack";
import htmlWebPackPlugin = require("html-webpack-plugin");

const configuration: webpack.Configuration = {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules$/,
                use: [
                    'style-loader',
                    "css-loader"
                ]
            },
            {
                test: /\.ts|.tsx$/,
                exclude: /node_modules$/,
                use: 'ts-loader',
            }
        ],
    },
    resolve: {
        extensions: [ '.js', '.tsx', '.ts', ".css"],
        alias: {
          '@mui/styled-engine': '@mui/styled-engine-sc'
        },
    },
    plugins: [
        new htmlWebPackPlugin({
            template: "./src/index.html"
        })
    ],
    entry: './src/index.tsx'
};

export default configuration;