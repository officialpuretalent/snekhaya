import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('@/views/BookingView.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogView.vue')
  },
  {
    path: '/calculators',
    name: 'calculators',
    component: () => import('@/views/CalculatorsView.vue')
  },
  // Portal stubs — lazy-loaded, zero bundle cost until used
  {
    path: '/portal/login',
    name: 'portal-login',
    component: () => import('@/views/portal/LoginView.vue')
  },
  {
    path: '/portal/dashboard',
    name: 'portal-dashboard',
    component: () => import('@/views/portal/DashboardView.vue')
  },
  {
    path: '/portal/documents',
    name: 'portal-documents',
    component: () => import('@/views/portal/DocumentsView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  if (to.name === 'booking') {
    document.body.classList.add('booking-page')
  } else {
    document.body.classList.remove('booking-page')
  }
})

export default router
