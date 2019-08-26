import api from '@/api'
import router from '@/router'
import ResetPassword from '@/views/reset-password/index.vue'
import TResetPassword from '@/views/reset-password/reset-password'
import { createLocalVue, mount, ThisTypedMountOptions, Wrapper } from '@vue/test-utils'
import MockAdapter from 'axios-mock-adapter'
import VeeValidate from 'vee-validate'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import i18n from '@/i18n'
import VueI18n from 'vue-i18n'
import { BAD_REQUEST, OK } from 'http-status-codes'

const localVue = createLocalVue()
localVue.use(VeeValidate)
localVue.use(VueRouter)
localVue.use(VueI18n)

const apiMock = new MockAdapter(api)

describe('Reset password views', () => {
  let mountFn: (options?: ThisTypedMountOptions<TResetPassword>) => Wrapper<TResetPassword>

  beforeEach(() => {
    mountFn = (options = {}) => {
      return mount(ResetPassword, {
        localVue,
        router,
        i18n,
        vuetify: new Vuetify(),
        ...options
      })
    }
  })

  it('should focus email input first', () => {
    mountFn()
    expect(document.activeElement!.getAttribute('data-test'))
      .toBe('email-input')
  })

  it('should focus email when error', async () => {
    const wrapper = mountFn()
    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()
    expect(document.activeElement!.getAttribute('data-test'))
      .toBe('email-input')
  })

  it('should not submitted while processing', async () => {
    const wrapper = mountFn({ data: () => ({ processing: true }) })
    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()
  })

  it('cannot connect to the server', async () => {
    apiMock.onPost('/users/reset-password').timeoutOnce()
    const wrapper = mountFn({
      data: () => ({ email: 'invalid-email@domain.tld' })
    })

    wrapper.find('[data-test="form"]').trigger('submit')
    // wrapper.find('[data-test="submit-btn"]').trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain(i18n.t('api.error.server'))
  })

  it('should show error when username or email is disabled', async () => {
    apiMock.onPost('/users/reset-password').replyOnce(BAD_REQUEST, {
      data: {
        disabled: true
      }
    })
    const wrapper = mountFn({
      data: () => ({ email: 'disabled-email@domain.tld' })
    })

    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(i18n.t('user.disabled'))
  })

  it(`should show error when username or email doesn't exists`, async () => {
    apiMock.onPost('/users/reset-password').replyOnce(BAD_REQUEST, { data: null })
    const wrapper = mountFn({
      data: () => ({ email: 'invalid-email@domain.tld' })
    })

    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(i18n.t('user.notFound'))
  })

  it('should be sent', async () => {
    apiMock.onPost('/users/reset-password').replyOnce(OK)
    const wrapper = mountFn({
      data: () => ({ email: 'signed-email@domain.tld' })
    })

    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(i18n.t('resetPassword.success'))
  })

  it('show login link when success', () => {
    const wrapper = mountFn({
      data: () => ({ sent: true })
    })

    expect(wrapper.find('[data-test="login-link"]').attributes('href'))
      .toBe('/login')
  })
})
