import merge from "webpack-merge";
import webPackConfig from "./webpack.config";
import * as path from "path";

const configuration = merge(webPackConfig, {
    mode: "production",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
});

export default configuration;