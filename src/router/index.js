import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Success from "@/components/Success"
import User from "@/components/admin/User";
import Rights from "@/components/admin/Rights";

Vue.use(VueRouter)

const routes = [
    {
        path: '/success',
        component: Success
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            {path: '/welcome', component: Welcome},
            {path: '/user', component: User},
            {path: '/rights', component: Rights},
        ],
    },
]

const router = new VueRouter({
    routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to:将要访问的路径
    // from:从哪里访问的路径
    // next:之后要做的任务，是一个函数
    //    next（）放行， next（'/URL'）强制跳转的路径。
    if (to.path == '/login') return next();// 访问路径为登录
    // 获取flag
    const flagStr = window.sessionStorage.getItem("flag");// session取值
    if (!flagStr) return next('/login');// 没登录去登录
    next();
})

export default router// 暴露出去
