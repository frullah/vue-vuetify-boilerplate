import Login from '@/views/login/index.vue'
import { createLocalVue, mount, Wrapper, ThisTypedMountOptions } from '@vue/test-utils'
import VeeValidate from 'vee-validate'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(VeeValidate)

describe('Login view', () => {
  type Instance = InstanceType<typeof Login>
  let mountFn: (options?: ThisTypedMountOptions<Login>) => Wrapper<Instance>

  beforeEach(() => {
    mountFn = (options = {}) => {
      return mount(Login, {
        localVue,
        router: new VueRouter({ mode: 'history' }),
        vuetify: new Vuetify(),
        ...options
      })
    }
  })

  it('should focus username first', () => {
    mountFn()
    expect(document.activeElement!.getAttribute('data-test'))
      .toBe('username-input')
  })

  it('have create account link', () => {
    const wrapper = mountFn()
    expect(wrapper.find('[data-test="signup-link"]').attributes('href'))
      .toBe('/signup')
  })

  it('have reset password link', () => {
    const wrapper = mountFn()
    expect(wrapper.find('[data-test="reset-password-link"]').attributes('href'))
      .toBe('/reset-password')
  })

  it('username required', async () => {
    const wrapper = mountFn({
      data: () => ({ password: 'password' })
    })

    wrapper.find('[data-test="form"]').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('The username field is required.')
  })

  it('password required', async () => {
    const wrapper = mountFn({
      data: () => ({ username: 'username' })
    })

    wrapper.find('[data-test="form"]').trigger('submit')
    await flushPromises()
    expect(wrapper.text()).toContain('The password field is required.')
  })
})
