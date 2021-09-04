import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{ path: "/", redirect: "/login" },
		{ path: "/login", name: "Login", component: Login },
		{
			path: "/home",
			name: "Home",
			component: () => import( /* webpackChunkName: "Home"*/ "../views/Home/Home"),
			redirect: "/welcome",
			children: [
				{ path: "/welcome", name: "Welcome", component: () => import ( /* webpackChunkName: "Welcome"*/ "../views/Home/Welcome") },
				{ path: "/users", name: "Users", component: () => import ( /* webpackChunkName: "Users"*/ "../views/Users/Users") },
			]
		},
	]
});

router.beforeEach((to, from, next) => {
	let token = sessionStorage.getItem("token")
	if (to.path === '/login' || token) return next()

	Vue.prototype.$message.info("请先登录")
	next("/login")

});

export default router;
