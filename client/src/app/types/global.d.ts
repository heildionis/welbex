declare module '*.scss' {
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.svg' {
	import type React from 'react';

	const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

type BuildProject = 'production' | 'storybook' | 'jest';

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: BuildProject;
declare const __UPLOADS__: string;

type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type OptionalRecord<K extends keyof any, T> = {
	[P in K]?: T;
};
