import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {path: "/", redirect: "/login"},
        {path: "/login", name: "Login", component: Login}
    ]
});

router.beforeEach((from, to, next) => {
    console.log(from, to);
    next();
});

export default router;
