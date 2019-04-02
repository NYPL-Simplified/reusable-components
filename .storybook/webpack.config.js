module.exports = async ({ config }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
    });
    config.module.rules.push({
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
