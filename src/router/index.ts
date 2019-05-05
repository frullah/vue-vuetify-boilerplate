import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

export const defaultRoutes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('@/views/home.vue'),
    meta: {
      title: 'Halaman utama'
    }
  },
  {
    path: '/reset-password',
    component: () => import('@/views/reset-password/index.vue'),
    meta: {
      title: 'Reset password'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    beforeEnter (to, from, next) {
      if (store.getters['user/isLoggedIn']) return next('/')
      next()
    },
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/signup',
    component: () => import('@/views/signup/index.vue'),
    beforeEnter (to, from, next) {
      if (store.getters['user/isLoggedIn']) return next('/')
      next()
    },
    meta: {
      title: 'Sign up'
    }
  },
  {
    path: '/logout',
    async beforeEnter (to, from, next) {
      await store.dispatch('user/LOGOUT')
      window.location.replace('/')
    }
  },
  {
    path: '*',
    component: () => import('@/views/not-found.vue'),
    meta: {
      title: 'Halaman tidak ditemukan'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: defaultRoutes
})

router.beforeResolve((to, from, next) => {
  const lastMatched = to.matched[to.matched.length - 1]
  let title = 'Vue Vuetify Template'

  if (typeof lastMatched.meta.title === 'string') {
    title = `${lastMatched.meta.title} - ${title}`
  }

  document.title = title
  next()
})

Vue.router = router

export default router
