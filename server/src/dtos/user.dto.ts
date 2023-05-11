import { UserModelSchema } from '../models/user/index.js';

export class UserDto {
	username: string;
	id: string;

	constructor(model: UserModelSchema) {
		this.id = model._id;
		this.username = model.username;
	}
}
