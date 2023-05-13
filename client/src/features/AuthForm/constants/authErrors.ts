export const AuthEnum: Record<string, string> = {
	INCORRECT_AUTH_DATA: 'Неверный логин или пароль!',
	VALIDATION_ERROR:
		'В пароле и имени пользователя должны быть минимум 8 символов!',
	USER_EXIST: 'Такой пользователь существует!',
} as const;
