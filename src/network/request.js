import axios from "axios";

const baseURL = "https://www.fastmock.site/mock/84c2b4d27ce1ced81043cc85b20a7fd0/shop_v1";

let net = axios.create({
	baseURL,
	timeout: 5000
});

net.interceptors.request.use(config => {
	config.headers.Authorization = sessionStorage.getItem("token");
	return config;
});

net.interceptors.response.use(res => res.data);

export default net;
