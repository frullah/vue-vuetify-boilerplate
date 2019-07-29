import App from '@/App.vue'
import store from '@/store'
import { Wrapper, mount, createLocalVue, ThisTypedMountOptions } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

const localVue = createLocalVue()

describe('App view', () => {
  type Instance = InstanceType<typeof App>
  let mountFn: (options?: ThisTypedMountOptions<App>) => Wrapper<Instance>

  beforeEach(() => {
    mountFn = (options = {}) => {
      return mount(App, {
        localVue,
        vuetify: new Vuetify(),
        router: new VueRouter({ mode: 'history' }),
        store,
        ...options
      })
    }
  })

  it('have log in button', () => {
    const wrapper = mountFn()

    expect(wrapper.find('[data-test="app-login-btn"]').attributes('href'))
      .toBe('/login')
  })

  it('have sign up button', () => {
    const wrapper = mountFn()

    expect(wrapper.find('[data-test="app-signup-btn"]').attributes('href'))
      .toBe('/signup')
  })

  it('show user button', () => {

  })
})
