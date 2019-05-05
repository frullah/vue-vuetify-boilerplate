import router from '@/router'
import store from '@/store'

export default async function loadRoute () {
  const roleName = (store.state as any).user.data.roles
  const { routes, navItems } = await import(`./roles/${roleName}`)

  router.addRoutes(routes)
  store.commit('app/SET_NAVIGATION_ITEMS', navItems)
}
