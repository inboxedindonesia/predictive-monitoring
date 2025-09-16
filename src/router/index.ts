import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes: RouteRecordRaw[] = [
  { path: '/login', component: () => import('../pages/Login.vue'), meta: { public: true } },
  { path: '/', redirect: '/cms' },
  {
    path: '/cms',
    component: () => import('../components/layout/AppLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/Dashboard.vue') },
      { path: 'predictive', component: () => import('../pages/PredictiveMaintenance.vue') },
      { path: 'energy', component: () => import('../pages/EnergyCost.vue') },
      { path: 'assets', component: () => import('../pages/Assets.vue') },
      { path: 'tickets', component: () => import('../pages/Tickets.vue') },
      { path: 'users', component: () => import('../pages/Users.vue') },
      { path: 'reports', component: () => import('../pages/Reports.vue') },
      { path: 'notifications', component: () => import('../pages/Notifications.vue') },
      { path: 'config', component: () => import('../pages/Config.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.public) return true
  const user = useUserStore()
  if (!user.isAuthenticated && to.path.startsWith('/cms')) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
