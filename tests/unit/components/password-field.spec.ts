import PasswordFieldVue from '@/components/password-field/index.vue'
import PasswordField from '@/components/password-field/password-field'
import { mount, ThisTypedMountOptions } from '@vue/test-utils'

describe('password-field component', function () {
  const mountFn = (options: ThisTypedMountOptions<PasswordField> = {}) => {
    return mount<PasswordField>(PasswordFieldVue, options)
  }
  it('input type should be password', () => {
    const wrapper = mountFn()
    expect(wrapper.vm.passwordIcon).toBe('visibility')
    expect(wrapper.vm.passwordFieldType).toBe('password')
  })

  it('input type should be text ', () => {
    const wrapper = mountFn({
      data: () => ({ visiblePassword: true })
    })
    expect(wrapper.vm.passwordIcon).toBe('visibility_off')
    expect(wrapper.vm.passwordFieldType).toBe('text')
  })

  it('should toggle input type when eye icon clicked', () => {
    const wrapper = mountFn()
    wrapper.vm.togglePassword()
    expect(wrapper.vm.visiblePassword).toBe(true)
    expect(wrapper.vm.passwordIcon).toBe('visibility_off')
    expect(wrapper.vm.passwordFieldType).toBe('text')
  })
})
