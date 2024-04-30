const path = require("path");


/** @type {import("webpack").Configuration} */
const config = {
    entry: "./ts/index.ts",
    output: {
        path: path.join(__dirname, "./js"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    mode: "development"
}
module.exports = config;