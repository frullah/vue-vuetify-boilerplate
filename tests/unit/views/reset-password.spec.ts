import ResetPassword from '@/views/reset-password/index.vue'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import { VAlert, VTextField } from 'vuetify/lib'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VeeValidate)
localVue.use(VueRouter)

describe('Reset password views', () => {
  const mountFn = (options = {}) => {
    return mount(ResetPassword, {
      localVue,
      router: new VueRouter({ mode: 'history' }),
      vuetify: new Vuetify(),
      ...options
    })
  }

  it('should focus username first', () => {
    mountFn({ stubs: ['router-link'] })
    expect(document.activeElement!.getAttribute('data-test'))
      .toBe('email-input')
  })

  it('show error when username or email not found', async () => {
    const wrapper = mountFn({
      data: () => ({ email: 'invalid-email@domain.tld' }),
      methods: {
        resetPassword: jest.fn().mockImplementationOnce(async () => {
          wrapper.setData({
            error: 'Cannot find username or email'
          })
        })
      }
    })

    wrapper.find('[data-test="form"]').trigger('submit')

    await flushPromises()

    expect(wrapper.text()).toContain('Cannot find username or email')
  })

  it('show success message when success', async () => {
    const wrapper = mountFn({
      data: () => ({ email: 'signed-email@domain.tld' }),
      methods: {
        resetPassword: jest.fn().mockImplementationOnce(async () => {
          wrapper.setData({
            sent: true
          })
        })
      }
    })

    wrapper.find('[data-test="form"]').trigger('submit')

    await flushPromises()

    expect(wrapper.text()).toContain('Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.')
  })

  it('show login link when success', () => {
    const wrapper = mountFn({
      data: () => ({ sent: true })
    })

    expect(wrapper.find('[data-test="login-link"]').attributes('href'))
      .toBe('/login')
  })
})
