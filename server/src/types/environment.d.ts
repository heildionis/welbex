export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			JWT_ACCESS_SECRET: string;
			JWT_REFRESH_SECRET: string;
			APP_PORT: string;
			MONGO_URL: string;
			ORIGIN_URL: string;
			SERVER_URL: string;
		}
	}
}
