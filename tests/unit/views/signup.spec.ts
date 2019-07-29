import PasswordField from '@/components/password-field/index.vue'
import SignUp from '@/views/signup/index.vue'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import { VTextField } from 'vuetify/lib'

describe.skip('Sign up views', () => {
  it('should focus email first', () => {
    const wrapper = shallowMount(SignUp, {
      stubs: { VTextField }
    })

    expect(document.activeElement!.getAttribute('data-test')).toBe('email-input')
  })

  it('all field required', async () => {
    const wrapper = shallowMount(SignUp, {
      stubs: { VTextField, PasswordField }
    })

    wrapper.find('[data-test="form"]').trigger('submit')

    await flushPromises()

    const text = wrapper.text()

    expect(text).toContain('The email field is required.')
    expect(text).toContain('The username field is required.')
    expect(text).toContain('The password field is required.')
    expect(text).toContain('The fullname field is required.')
  })

  it('valid email required', async () => {
    const wrapper = shallowMount(SignUp, {
      data: () => ({ email: 'invalid-email' }),
      stubs: { VTextField }
    })

    wrapper.find('[data-test="form"]').trigger('submit')

    await flushPromises()

    expect(wrapper.text()).toContain('The email field must be a valid email.')
  })

  it('username and password have at least 5 chars ', async () => {
    const wrapper = shallowMount(SignUp, {
      data: () => ({ username: '1234', password: '1234' }),
      stubs: { VTextField, PasswordField }
    })

    wrapper.find('[data-test="form"]').trigger('submit')
    await flushPromises()

    const text = wrapper.text()

    expect(text).toContain('The username field must be at least 5 characters.')
    expect(text).toContain('The password field must be at least 5 characters.')
  })
})
