import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig, NavigationGuard } from 'vue-router'

Vue.use(VueRouter)

const unloggedInBeforeEnter: NavigationGuard<Vue> = (to, from, next) => {
  if (store.getters['user/isLoggedIn']) return next('/')
  next()
}

export const defaultRoutes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/home.vue'),
    meta: { title: 'Halaman utama' }
  },
  {
    name: 'reset password',
    path: '/reset-password',
    component: () => import('@/views/reset-password/index.vue'),
    meta: { title: 'Reset password' }
  },
  {
    name: 'sign in',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    beforeEnter: unloggedInBeforeEnter,
    meta: { title: 'Login' }
  },
  {
    name: 'register',
    path: '/signup',
    component: () => import('@/views/signup/index.vue'),
    beforeEnter: unloggedInBeforeEnter,
    meta: { title: 'Sign up' }
  },
  {
    name: 'logout',
    path: '/logout',
    async beforeEnter (to, from, next) {
      await store.dispatch('user/LOGOUT')
      window.location.replace('/')
    }
  },
  {
    path: '*',
    component: () => import('@/views/not-found.vue'),
    meta: { title: 'Halaman tidak ditemukan' }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: defaultRoutes
})

router.beforeResolve((to, from, next) => {
  const lastMatched = to.matched[to.matched.length - 1]
  const baseTitle = 'Vue Vuetify Template'

  if (typeof lastMatched.meta.title === 'string') {
    document.title = `${lastMatched.meta.title} - ${baseTitle}`
  } else {
    document.title = baseTitle
  }

  next()
})

Vue.router = router

export default router
