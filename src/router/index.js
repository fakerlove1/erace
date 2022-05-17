import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

//import router modules
import register from './modules/register'
import dashboard from './modules/dashboard'


const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/container',
        component: () =>
            import ('@/views/container'),
        redirect: '/',
        children: [
            // 登录
            {
                path: '/login',
                component: () =>
                    import ('@/views/login')
            },
            // 注册
            register,
            // 主页
            dashboard,
            // 忘记密码
            {
                path: '/forget',
                component: () =>
                    import ('@/views/other/ForgetPassword')
            },
            // 临时测试
            {
                path: '/tmp',
                component: () =>
                    import ('@/views/tmp/tmp')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})


// router intercept
router.beforeEach((to, from, next) => {
    // if(to.path ==  from.path ) return;
    store.commit('other/SET_ROUTERPATH', to.path);
    if (to.path !== '/login') {
        if (to.path === '/forget' || to.path.substr(0, 9) === '/register') return next();
        else if (!store.getters.token) return next('/login');
        else return next();
    } else if (to.path === '/login') {
        if (store.getters.token) return next('/dashboard');
        // else if(!store.getters.token) return next('/login');
        else return next();
    }
})

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router