const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {

    const IS_DEV = argv.mode !== 'production';

    return {
        mode: IS_DEV ? 'development' : 'production',
        entry: "./src/main.tsx",
        output: {
            filename: "bundle.js",
            path: path.join(__dirname, "public")
        },
        resolve: {
            modules: [
                'node_modules',
                path.resolve('./src')
            ],
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
                    test: /\.js$/,
                    use: [{
                        loader: "source-map-loader",
                        options: {
                            enforce: "pre",
                            presets: ['@babel/preset-env', '@abbel/preset-react']
                        }
                    }],
                    exclude: '/node_modules/'
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