import { DefaultErrors } from './constants/default.errors.js';

export class ApiError extends Error {
	status: number;

	errors: any;

	constructor(status: number, message: string, errors: any[] = []) {
		super(message);
		this.errors = errors;
		this.status = status;
	}

	static badRequest(message: string, errors: any[] = []) {
		return new ApiError(400, message, errors);
	}

	static unauthorized(errors: any[] = []) {
		return new ApiError(401, DefaultErrors.UNAUTHORIZED, errors);
	}

	static forbidden(
		message: string = DefaultErrors.FORBIDDEN,
		errors: any[] = []
	) {
		return new ApiError(403, message, errors);
	}

	static notFound(
		message: string = DefaultErrors.NOT_FOUND,
		errors: any[] = []
	) {
		return new ApiError(404, message, errors);
	}

	static notAcceptable(
		message: string = DefaultErrors.NOT_ACCEPTABLE,
		errors: any[] = []
	) {
		return new ApiError(406, message, errors);
	}

	static conflict(
		message: string = DefaultErrors.CONFILCT,
		errors: any[] = []
	) {
		return new ApiError(409, message, errors);
	}
}
