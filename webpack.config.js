var webpack = require("webpack");
var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: [
      "./src/stylesheets/app.scss",
      "./src/index.tsx"
    ]
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "reusable-components.js",
    library: "ReusableComponents",
    libraryTarget: "umd"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  plugins: [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
    // jsdom is required by opds-web-client for server rendering, but causes
    // errors in the browser even if it is never used, so we ignore it:
    new webpack.IgnorePlugin(/jsdom$/),
    new MiniCssExtractPlugin({ filename: "reusable-components.css" })
  ],

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(ttf|woff|eot|svg|png|woff2|gif|jpg)(\?[\s\S]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  },

  devServer: {
    historyApiFallback: true
  }
};