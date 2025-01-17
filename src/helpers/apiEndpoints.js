export const PROJECT_CALL = Object.freeze({
	CREATE_PROJECT: "/project/create",
	GET_PERSONAL_PROJECT: "/project",
	UPDATE_PROJECT: "/project/update",
	DELETE_PROJECT: "/project/delete/",
	GET_FEED_PROJECTS: "/project/projects",
});

export const USER_CALL = Object.freeze({
	REGISTER_USER: "/auth/register",
	SIGN_IN_USER: "/auth/login",
	AUTHENTICATE_USER: "/auth/authenticate",
	DELETE_USER: "/auth/delete",
	UPDATE_USER: "/auth/update",
});

export const USER_TOKEN = Object.freeze("Bearer");
