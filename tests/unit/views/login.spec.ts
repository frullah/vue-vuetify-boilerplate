import PasswordField from '@/components/password-field/index.vue'
import Login from '@/views/login/index.vue'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import { VTextField } from 'vuetify/lib'

describe('Login view', () => {
  it('should focus username first', () => {
    shallowMount(Login, {
      stubs: { VTextField }
    })

    expect(document.activeElement!.getAttribute('data-test'))
      .toBe('username-input')
  })

  it('have create account link', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('[data-test="signup-link"]').attributes('to'))
      .toBe('/signup')
  })

  it('have reset password link', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('[data-test="reset-password-link"]').attributes('to'))
      .toBe('/reset-password')
  })

  it('username required', async () => {
    const wrapper = shallowMount(Login, {
      data: () => ({ password: 'password' }),
      stubs: { VTextField, PasswordField }
    })

    wrapper.find('[data-test="form"]').trigger('submit')

    await flushPromises()

    expect(wrapper.text()).toContain('The username field is required.')
  })

  it('password required', async () => {
    const wrapper = shallowMount(Login, {
      data: () => ({ username: 'username' }),
      stubs: { VTextField, PasswordField }
    })

    wrapper.find('[data-test="form"]').trigger('submit')

    await flushPromises()

    expect(wrapper.text()).toContain('The password field is required.')
  })
})
