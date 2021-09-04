import net from './request';

/**
 * username
 * password
 */
export const apiLogin = data => net({
	url: "/login",
	data,
	method: "post"
})

export const getHomeAsideMenu = () => net({
	url: "/home_aside_menu",
	method: "get"
})

export const getUsers = () => net({
	url: "/users",
	method: "get"
})