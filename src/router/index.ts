import { createRouter, createMemoryHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'WorkSpace',
        component: () => import('@/views/WorkSpaceView.vue')
    },
    {
        path: '/editor',
        name: 'Editor',
        component: () => import('@/components/AppEditor.vue')
    },
    {
        path: '/single',
        name: 'Single',
        component: () => import('@/views/SingleView.vue')
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/WelcomeView.vue')
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router