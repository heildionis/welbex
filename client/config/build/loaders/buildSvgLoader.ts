import webpack from 'webpack';

export const buildSvgLoader = (): webpack.RuleSetRule => ({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
    exclude: /node_modules/,
});
