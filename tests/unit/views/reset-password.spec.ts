import { shallowMount } from '@vue/test-utils'
import ResetPassword from '@/views/reset-password/index.vue'
import { VTextField, VAlert } from 'vuetify/lib'
import flushPromises from 'flush-promises'

describe('Reset password views', () => {
  it('should focus username first', () => {
    const wrapper = shallowMount(ResetPassword, {
      stubs: { VTextField }
    })

    expect(document.activeElement!.getAttribute('data-test')).toBe('email-input')
  })

  it('show error when username or email not found', async () => {
    const wrapper = shallowMount(ResetPassword, {
      stubs: { VTextField, VAlert },
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
    const wrapper = shallowMount(ResetPassword, {
      stubs: { VTextField, VAlert },
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
    const wrapper = shallowMount(ResetPassword, {
      stubs: { VTextField },
      data: () => ({ sent: true })
    })

    expect(wrapper.find('[data-test="login-link"]').attributes('to'))
      .toBe('/login')
  })
})
