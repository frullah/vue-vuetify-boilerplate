import Component from 'vue-class-component'
import { Mixins, Prop } from 'vue-property-decorator'
import { VTextField, VInput } from 'vuetify/lib'
import Vue, { VueConstructor } from 'vue'

@Component({
  name: 'password-field',
  inheritAttrs: false
})
export default class PasswordField extends Vue {
  visiblePassword = false

  get passwordFieldType () {
    return this.visiblePassword ? 'text' : 'password'
  }

  get passwordIcon () {
    return this.visiblePassword ? 'visibility_off' : 'visibility'
  }

  togglePassword () {
    this.visiblePassword = !this.visiblePassword
  }
}
