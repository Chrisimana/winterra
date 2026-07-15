import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'landing', component: () => import('@/views/LandingView.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/budget', name: 'budget', component: () => import('@/views/BudgetView.vue') },
  { path: '/packing', name: 'packing', component: () => import('@/views/PackingView.vue') },
  { path: '/countdown', name: 'countdown', component: () => import('@/views/CountdownView.vue') },
  { path: '/credits', name: 'credits', component: () => import('@/views/CreditsView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
