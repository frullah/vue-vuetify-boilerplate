import App from '@/App.vue'
import store from '@/store'
import { shallowMount, mount, RouterLinkStub } from '@vue/test-utils'
import VBtn from 'vuetify/es5/components/VBtn/VBtn'

describe('App view', () => {
  it('have log in button', () => {
    const wrapper = mount(App, {
      stubs: ['router-link', 'router-view'],
      store
    })

    expect(wrapper.find('[data-test="app-login-btn"]').attributes('to'))
      .toBe('/login')
  })

  it('have sign up button', () => {
    const wrapper = mount(App, {
      stubs: ['router-link', 'router-view'],
      store
    })

    expect(wrapper.find('[data-test="app-signup-btn"]').attributes('to'))
      .toBe('/signup')
  })
})
