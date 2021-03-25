const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "production",

  devtool: "source-map",

  entry: {
    app: [
      "./src/stylesheets/app.scss",
      "./src/components.tsx"
    ]
  },

  plugins: [
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
  }
});
