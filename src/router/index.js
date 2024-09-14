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