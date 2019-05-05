import api from '@/api'
import PasswordField from '@/components/password-field/index.vue'
import { focusToErrorTextField } from '@/utils/focus-to-error-text-field'
import { OK } from 'http-status-codes'
import { Component, Vue } from 'vue-property-decorator'
import { Validator } from 'vee-validate'
import { userAvailability } from '@/utils/vee-validate/user-availability'

@Component({
  components: {
    PasswordField
  }
})
export default class SignUp extends Vue {
  email: string | null = null
  username: string | null = null
  password: string | null = null
  fullname: string | null = null
  processing: boolean = false
  $refs!: {
    form: HTMLFormElement
  }

  beforeCreate () {
    Validator.extend('user-availability', userAvailability)
  }

  created () {
  }

  async signup () {
    if (this.processing) return
    this.processing = true

    if (await this.$validator.validateAll()) {
      try {
        const response = await api.post('/signup', {
          email: this.email,
          username: this.username,
          password: this.password,
          fullname: this.fullname
        })

        if (response.status === OK) {
          this.$router.push('/')
        }
      } catch (error) {
        //
      }
    } else {
      focusToErrorTextField(this.$refs.form)
    }

    this.processing = false
  }
}
