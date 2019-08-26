import api from '@/api'
import PasswordField from '@/components/password-field/index.vue'
import { focusToErrorTextField } from '@/utils/focus-to-error-text-field'
import { OK, UNAUTHORIZED, BAD_REQUEST } from 'http-status-codes'
import { Component, Vue } from 'vue-property-decorator'
import { Validator } from 'vee-validate'
import { userAvailability } from '@/utils/vee-validate/user-availability'
import { AxiosError } from 'axios'

@Component({
  components: {
    PasswordField
  }
})
export default class SignUp extends Vue {
  email: string | null = null
  username: string | null = null
  password: string | null = null
  name: string | null = null
  error: string | null = null
  success: string | null = null
  processing: boolean = false
  $refs!: {
    form: HTMLFormElement
  }

  beforeCreate () {
    Validator.extend('user-availability', userAvailability)
  }

  get hasError () {
    return this.error !== null
  }

  async signup () {
    if (this.processing) return
    this.processing = true

    if (!await this.$validator.validateAll()) {
      focusToErrorTextField(this.$refs.form)
      this.processing = false
      return
    }

    try {
      await api.post('/register', {
        email: this.email,
        username: this.username,
        password: this.password,
        name: this.name
      })

      this.$router.push('/')
    } catch (error) {
      const { response }:AxiosError = error
      if (response === undefined) {
        this.error = this.$t('api.error.server') as string
        return
      }

      // if (response.status === BAD_REQUEST) {
      //   return
      // }
    } finally {
      this.processing = false
    }
  }
}
