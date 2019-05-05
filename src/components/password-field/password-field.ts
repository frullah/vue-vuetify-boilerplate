import Component from 'vue-class-component'
import { Mixins, Prop } from 'vue-property-decorator'
import VTextField from 'vuetify/lib/components/VTextField/VTextField'

@Component({
  name: 'password-field'
})
export default class PasswordField extends Mixins(VTextField) {
  visiblePassword: boolean = false

  get passwordFieldType () {
    return this.visiblePassword ? 'text' : 'password'
  }

  get passwordIcon () {
    return this.visiblePassword ? 'visibility' : 'visibility_off'
  }

  togglePassword () {
    this.visiblePassword = !this.visiblePassword
  }
}
