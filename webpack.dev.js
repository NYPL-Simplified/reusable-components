const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",

  entry: {
    app: [
      "./src/stylesheets/demo.scss",
      "./src/index.tsx"
    ]
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
    ]
  }
});
