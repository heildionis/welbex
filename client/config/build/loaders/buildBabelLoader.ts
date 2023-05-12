import webpack from 'webpack';

import { BuildOptions } from '../types/config';

interface BuildBabelLoaderProps extends BuildOptions {
	isTsx: boolean;
}

export const buildBabelLoader = ({
	isDev,
	isTsx,
}: BuildBabelLoaderProps): webpack.RuleSetRule => {
	const isProd = !isDev;

	return {
		test: isTsx ? /\.(tsx)$/ : /\.(js|ts)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				cacheDirectory: true,
				presets: ['@babel/preset-env'],
				plugins: [
					[
						'@babel/plugin-transform-typescript',
						{
							isTsx,
						},
					],
					'@babel/plugin-transform-runtime',
					isDev && require.resolve('react-refresh/babel'),
				].filter(Boolean),
			},
		},
	};
};
