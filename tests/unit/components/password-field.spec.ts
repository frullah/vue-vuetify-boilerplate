import PasswordFieldVue from '@/components/password-field/index.vue'
import PasswordField from '@/components/password-field/password-field'
import { mount, ThisTypedMountOptions } from '@vue/test-utils'

describe('password-field component', function () {
  const mountFn = (options: ThisTypedMountOptions<PasswordField> = {}) => {
    return mount<PasswordField>(PasswordFieldVue, options)
  }
  it('should show eye icon by default', () => {
    const wrapper = mountFn()
    expect(wrapper.vm.passwordIcon).toBe('visibility')
    expect(wrapper.vm.passwordFieldType).toBe('password')
  })

  it('should show eye icon by default', () => {
    const wrapper = mountFn({
      data: () => ({
        visiblePassword: true
      })
    })
    expect(wrapper.vm.passwordIcon).toBe('visibility_off')
    expect(wrapper.vm.passwordFieldType).toBe('text')
  })
})
