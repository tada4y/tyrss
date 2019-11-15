const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {

    const IS_DEV = argv.mode === 'development';

    return {
        entry: "./src/main.tsx",
        output: {
            filename: "bundle.js",
            path: path.join(__dirname, "public")
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"]
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    enforce: "pre"
                }
            ]
        },
        devtool: IS_DEV ? "source-map" : "none",
        optimization: {
            minimizer: IS_DEV ? [] : [
                new TerserPlugin()
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, "public"),
            port: 3000,
            host: "localhost"
        }
    }
};