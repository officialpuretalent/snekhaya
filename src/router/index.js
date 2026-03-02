import { createRouter, createWebHashHistory } from 'vue-router'

const PORTAL_KEY = 'snekhaya_portal'

function isPortalAuthed() {
  try {
    return !!JSON.parse(localStorage.getItem(PORTAL_KEY) || 'null')?.token
  } catch {
    return false
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('@/views/BookingView.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
  },
  {
    path: '/calculators',
    name: 'calculators',
    component: () => import('@/views/CalculatorsView.vue'),
  },
  // Portal — guest routes
  {
    path: '/portal/login',
    name: 'portal-login',
    component: () => import('@/views/portal/LoginView.vue'),
  },
  {
    path: '/portal/register',
    name: 'portal-register',
    component: () => import('@/views/portal/LoginView.vue'),
  },
  // Portal — protected routes
  {
    path: '/portal/dashboard',
    name: 'portal-dashboard',
    component: () => import('@/views/portal/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/portal/documents',
    name: 'portal-documents',
    component: () => import('@/views/portal/DocumentsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/portal/reports',
    name: 'portal-reports',
    component: () => import('@/views/portal/ReportsView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'booking') {
    document.body.classList.add('booking-page')
  } else {
    document.body.classList.remove('booking-page')
  }
})

router.beforeEach((to) => {
  const authed = isPortalAuthed()
  if (to.meta.requiresAuth && !authed) {
    return { name: 'portal-login', query: { redirect: to.fullPath } }
  }
  if ((to.name === 'portal-login' || to.name === 'portal-register') && authed) {
    return { name: 'portal-dashboard' }
  }
})

export default router
