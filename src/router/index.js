import { createMemoryHistory, createWebHashHistory, createRouter } from 'vue-router'



export const routes = [
    {
        path: '/',
        component: () => import('../pages/home.vue'),
        meta: {
            title: "首页"
        }
    },
    {
        path: '/skeleton',
        component: () => import('../pages/skeleton.vue'),
        meta: {
            title: "骨架屏"
        }
    },
    {
        path: '/tools',
        component: () => import('../pages/tools.vue'),
        meta: {
            title: "全局工具函数"
        }
    },
    {
        path: '/button',
        component: () => import('../pages/button.vue'),
        meta: {
            title: "按钮"
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    console.log('---');
    next()
})
export default router