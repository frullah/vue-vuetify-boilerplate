import Login from '@/views/login/index.vue'
import { createLocalVue, mount, Wrapper, ThisTypedMountOptions } from '@vue/test-utils'
import VeeValidate from 'vee-validate'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import router from '@/router'
import MockAdapter from 'axios-mock-adapter'
import api from '@/api'
import { FORBIDDEN, UNAUTHORIZED, OK } from 'http-status-codes'
import store from '@/store'
import VueI18n from 'vue-i18n'
import i18n from '@/i18n'
import { messages as veeEn } from 'vee-validate/dist/locale/en'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(VeeValidate)
localVue.use(VueI18n)

const apiMock = new MockAdapter(api)

describe('Login view', () => {
  type Instance = InstanceType<typeof Login>
  let mountFn: (options?: ThisTypedMountOptions<Login>) => Wrapper<Instance>

  beforeEach(() => {
    mountFn = (options = {}) => {
      return mount(Login, {
        localVue,
        router,
        store,
        i18n,
        vuetify: new Vuetify(),
        ...options
      })
    }
  })

  describe('element check', () => {
    it('should focus username first', () => {
      mountFn()
      expect(document.activeElement!.getAttribute('data-test'))
        .toBe('username-input')
    })

    it('should have create account link', () => {
      const wrapper = mountFn()
      expect(wrapper.find('[data-test="signup-link"]').attributes('href'))
        .toBe('/signup')
    })

    it('should have reset password link', () => {
      const wrapper = mountFn()
      expect(wrapper.find('[data-test="reset-password-link"]').attributes('href'))
        .toBe('/reset-password')
    })
  })

  it('should show required fields hint', async () => {
    const wrapper = mountFn()

    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()

    const text = wrapper.text()
    expect(text).toContain(veeEn.required('username'))
    expect(text).toContain(veeEn.required('password'))
  })

  it('should not submitted while processing', async () => {
    const wrapper = mountFn({ data: () => ({ processing: true }) })
    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()
  })

  it('should not connect to the server', async () => {
    apiMock.onPost('/auth/login').timeoutOnce()
    const wrapper = mountFn({
      data: () => ({
        username: 'username',
        password: 'password'
      })
    })

    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Cannot connect to the server')
  })

  it('should show information to disabled user', async () => {
    apiMock.onPost('/auth/login').replyOnce(FORBIDDEN)
    const wrapper = mountFn({
      data: () => ({
        username: 'username',
        password: 'password'
      })
    })

    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Account disabled')
  })

  it('should show information when username or passwordis invalid', async () => {
    apiMock.onPost('/auth/login').replyOnce(UNAUTHORIZED)
    const wrapper = mountFn({
      data: () => ({
        username: 'username',
        password: 'password'
      })
    })

    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Username or password is invalid')
  })

  it.only('should success', async () => {
    apiMock.onPost('/auth/login').replyOnce(OK, {
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    })
    apiMock.onGet('/auth/data').replyOnce(OK, {
      username: 'username',
      role: 'administrator',
      fullName: 'Administrator'
    })

    const wrapper = mountFn({
      data: () => ({
        username: 'username',
        password: 'password'
      })
    })

    wrapper.find('[data-test="form"]').trigger('submit.prevent')
    await flushPromises()
  })
})
