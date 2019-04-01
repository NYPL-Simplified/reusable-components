const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "production",

  // devtool: "source-map",

  entry: {
    app: [
      "./src/stylesheets/app.scss",
      "./src/components.tsx"
    ]
  },

  plugins: [
    // jsdom is required by opds-web-client for server rendering, but causes
    // errors in the browser even if it is never used, so we ignore it:
    new webpack.IgnorePlugin(
      /jsdom$|ReactContext|react\/addons|react\/lib\/ExecutionEnvironment|reactDOM/
    ),
    new MiniCssExtractPlugin({
      filename: "reusable-components.css"
    })
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react-addons-test-utils': true,
    'react': 'react',
    'react-dom': 'reactDOM'
  }
});
