import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: { name: 'home' }
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/student',
        name: 'student',
        meta: {
            auth: true,
            type: 'student',
        },
        component: () =>
            import ('../views/Student.vue')
    },
    {
        path: '/teacher',
        name: 'teacher',
        meta: {
            auth: true,
            type: 'teacher'
        },
        component: () =>
            import ('../views/Teacher.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        meta: {
            auth: true,
            type: 'admin'
        },
        component: () =>
            import ('../views/Admin.vue')
    },
    {
        path: '/tip',
        name: 'tip',
        component: () =>
            import ('../views/Tip.vue')
    },
    {
        path: '/auth',
        name: 'auth',
        component: () =>
            import ('../views/NoAuth.vue')
    },
    {
        path: '*',
        name: 'error',
        component: () =>
            import ('../views/Error.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        if (store.state.isLogin) {
            if (to.meta.type !== store.state.userInfo.type) {
                next({ name: 'auth' })
            } else {
                if (store.state.userInfo.type === 'student' && !store.state.isTime) {
                    next({ name: 'tip' });
                } else {
                    next();
                }
            }
        } else {
            next({ name: 'home' });
        }
    } else {
        next();
    }
})
export default router