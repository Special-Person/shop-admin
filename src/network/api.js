import network from './request';

export const apiLogin = data => network({
	url: "/login",
	data,
	method: "post"
})