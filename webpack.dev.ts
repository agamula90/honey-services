import merge from "webpack-merge";

import webPackConfig from "./webpack.config";

const configuration = merge(webPackConfig, {
    mode: "development",
    entry: './src/index.tsx',
})

export default configuration;