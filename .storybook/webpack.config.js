module.exports = async ({ config }) => {
  config.module.rules = config.module.rules.concat([
    {
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader'
    },
    {
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: {
            parser: 'typescript',
            prettierConfig: {
              printWidth: 80,
              trailingComma: 'es5',
              tabWidth: 2,
            },
          },
        },
      ],
      enforce: 'pre',
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.(ttf|woff|eot|svg|png|woff2|gif|jpg)(\?[\s\S]+)?$/,
      loader: 'url-loader?limit=100000'
    }
  ]);
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};