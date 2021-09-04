import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{ path: "/", redirect: "/login" },
		{ path: "/login", name: "Login", component: Login },
		{ path: "/home", name: "Home", component: () => import( /* webpackChunkName: "Home"*/ "../components/Home") },
	]
});

router.beforeEach((to, from, next) => {
	let token = sessionStorage.getItem("token")
	if (to.path === '/login' || token) return next()

	Vue.prototype.$message.info("请先登录")
	next("/login")

});

export default router;
