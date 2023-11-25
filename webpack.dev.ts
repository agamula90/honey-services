import merge from "webpack-merge";

import webPackConfig from "./webpack.config";

const configuration = merge(webPackConfig, {
    mode: "development"
});

export default configuration;