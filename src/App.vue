<template lang="pug">

v-app
  v-toolbar(app, clipped-left, color="primary", dark, dense)
    v-toolbar-side-icon(
      v-if="hasNavigationItems",
      large,
      @click="sideIconOnClick")

    v-toolbar-items
      v-btn.text-capitalize(flat, to="/")
        | Home
    v-spacer

    template(v-if="isLoggedIn")
      v-toolbar-items
        v-menu(
          offset-y,
          left,
          min-width="320px",
          :close-on-content-click="false")
          v-btn(slot="activator", large, icon)
            v-icon(large)
              | account_circle
          v-list
            v-list-tile.text-capitalize
              v-list-tile-title
                | {{ user.data.firstName }}
            v-divider
            v-list-tile(to="/logout", color="red")
              v-list-tile-content
                v-list-tile-title.font-weight-medium
                  | Log Out
    template(v-else)
      v-toolbar-items
        v-btn.text-none(
          data-test="app-login-btn",
          flat,
          to="/login")
          | Log in
        v-btn.text-none(
          data-test="app-signup-btn",
          flat,
          to="/signup")
          | Sign up

  v-navigation-drawer(
    v-if="hasNavigationItems",
    app,
    clipped,
    v-model="drawer")
    //- nested-list(:items="navigationItems")

  v-content
    v-slide-y-reverse-transition(mode="out-in")
      router-view
  //- global-dialog
  //- global-snackbar

</template>
<script>
import NestedList from '@/components/nested-list/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    'nested-list': NestedList
  }
})
export default class App extends Vue {
  get drawer () {
    return this.navigationItems.length > 0 && this.$store.state.app.drawer
  }

  set drawer (value) {
    this.$store.commit('app/DRAWER', value)
  }

  get isLoggedIn () {
    return this.$store.getters['user/isLoggedIn']
  }

  get navigationItems () {
    return this.$store.state.app.navigationItems || []
  }

  get hasNavigationItems () {
    return this.navigationItems.length > 0
  }

  get user () {
    return this.$store.state.user
  }

  sideIconOnClick () {
    this.drawer = !this.drawer
  }
}
</script>
<style>
</style>
