import PasswordField from '@/components/password-field/index.vue'
import SignUp from '@/views/signup/index.vue'
import { shallowMount, createLocalVue, mount, ThisTypedMountOptions, Wrapper } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import VeeValidate, { MessageGenerator } from 'vee-validate'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import router from '@/router'
import i18n from '@/i18n'
import MockAdapter from 'axios-mock-adapter'
import api from '@/api'
import Vuetify from 'vuetify'
import { messages as veeEn } from 'vee-validate/dist/locale/en'
import { OK, BAD_REQUEST } from 'http-status-codes'

const localVue = createLocalVue()
localVue.use(VeeValidate)
localVue.use(VueRouter)
localVue.use(VueI18n)

const apiMock = new MockAdapter(api)

describe('Sign up views', () => {
  let mountFn: (options?: ThisTypedMountOptions<SignUp>) => Wrapper<SignUp>

  beforeEach(() => {
    mountFn = (options = {}) => {
      return mount(SignUp, {
        localVue,
        router,
        i18n,
        vuetify: new Vuetify(),
        ...options
      })
    }
  })

  it('should focus email first', () => {
    const wrapper = mountFn()

    expect(document.activeElement!.getAttribute('data-test')).toBe('email-input')
  })

  it('required fields messages', async () => {
    const wrapper = mountFn()

    wrapper.find('[data-test="form"]').trigger('submit')
    await flushPromises()

    const text = wrapper.text()

    expect(text).toContain(veeEn.required('email'))
    expect(text).toContain(veeEn.required('username'))
    expect(text).toContain(veeEn.required('password'))
    expect(text).toContain(veeEn.required('name'))
  })

  it('field constraint messages when empty', async () => {
    const wrapper = mountFn({
      data: () => ({ email: 'invalid-email' })
    })

    wrapper.find('[data-test="form"]').trigger('submit')
    await flushPromises()

    const text = wrapper.text()
    const lengthBetween = [5, 32]

    expect(text).toContain(veeEn.email('email'))
    expect(text).toContain(veeEn.length('username', lengthBetween))
    expect(text).toContain(veeEn.length('password', lengthBetween))
  })

  it('should not processed', async () => {
    const wrapper = mountFn({
      data: () => ({ processing: true })
    })

    wrapper.find('[data-test="form"]').trigger('submit')
    await flushPromises()
  })

  it('should error when timeout', async () => {
    apiMock.onPost('/register').timeoutOnce()
    const wrapper = mountFn({
      data: () => ({
        username: 'username',
        password: 'password',
        email: 'email@domain.tld',
        name: 'my name'
      })
    })

    wrapper.find('[data-test="form"]').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain(i18n.t('api.error.server'))
  })

  it.skip('should error when timeout', async () => {
    apiMock.onPost('/register').replyOnce(BAD_REQUEST, {
      status: 'fail'
    })
    const wrapper = mountFn({
      data: () => ({
        username: 'username',
        password: 'password',
        email: 'email@domain.tld',
        name: 'my name'
      })
    })

    wrapper.find('[data-test="form"]').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain(i18n.t('api.error.server'))
  })

  it('should success', async () => {
    apiMock.onPost('/register').replyOnce(OK)
    const wrapper = mountFn({
      data: () => ({
        username: 'username',
        password: 'password',
        email: 'email@domain.tld',
        name: 'my name'
      })
    })

    wrapper.find('[data-test="form"]').trigger('submit')
    await flushPromises()
  })
})
