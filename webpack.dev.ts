import * as webpack from "webpack";
import merge from "webpack-merge";

import webPackConfig from "./webpack.config";

const configuration = merge<webpack.Configuration>(webPackConfig, {
    mode: "development",
    entry: './src/index.tsx',
})

export default configuration;