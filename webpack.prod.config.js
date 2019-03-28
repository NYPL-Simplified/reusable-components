var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  entry: {
    app: [
      "./src/stylesheets/app.scss", "./src/components.tsx"
    ]
  },
  output: {
    path: "./dist",
    publicPath: "/",
    filename: "reusable-components.js",
    library: "ReusableComponents",
    libraryTarget: "umd",
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
    // TODO:
    // Make sure we still need jsdom.
    // Possibly figure out a better way to ignore the rest of the plugins.
    new webpack.IgnorePlugin(/jsdom$|ReactContext|react\/addons|react\/lib\/ExecutionEnvironment/),

    // Extract separate css file.
    new ExtractTextPlugin("reusable-components.css")
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader!css-loader")
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg).*$/,
        loader: 'url-loader?limit=100000'
      }
    ],
  },
  resolve: {
    extensions: ["", ".js", ".json", ".ts", ".tsx", ".scss"]
  }
};

module.exports = config;
