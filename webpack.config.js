const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: "ts-loader",
                exclude: [/node_modules/, /webpack.config.js/]
            },
            {
                test: /\.css?$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|jpg|mp3|jpeg|svg)?$/i,
                type: "asset/resource"
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    mode: "development",
    devtool: "inline-source-map",
    watchOptions:{
        aggregateTimeout: 2000,
    }
}