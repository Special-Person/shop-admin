import axios from "axios";


let net = axios.create({
    timeout: 5000
});

net.interceptors.request.use(config => config);

net.interceptors.response.use(res => res.data);

export default net;
