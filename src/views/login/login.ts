import PasswordField from '@/components/password-field/index.vue'
import { IVForm, IVTextField } from '@/vuetify'
import { AxiosError } from 'axios'
import { BAD_REQUEST, FORBIDDEN, OK, UNAUTHORIZED } from 'http-status-codes'
import { Component, Vue } from 'vue-property-decorator'
import { focusToErrorTextField } from '@/utils/focus-to-error-text-field'

@Component({
  components: {
    PasswordField
  }
})
export default class Login extends Vue {
  error: string | null = null
  username: string | null = null
  password: string | null = null
  processing: boolean = false
  remember: boolean = false
  $refs!: {
    form: HTMLFormElement,
    username: IVTextField
  }

  async login () {
    if (this.processing) return
    this.processing = true
    this.error = null

    if (await this.$validator.validateAll()) {
      try {
        const result = await this.$store.dispatch(
          'user/LOGIN',
          {
            identifier: this.username,
            password: this.password
          }
        )

        if (result.status === OK) {
          this.$router.push('/')
        }
      } catch (error) {
        const { response }: AxiosError = error
        if (response === undefined) {
          this.error = 'Cannot connect to server'
        } else {
          switch (response.status) {
            case FORBIDDEN:
              this.error = 'Account disabled'
              break

            case BAD_REQUEST:
            case UNAUTHORIZED:
              this.error = 'Username or password is invalid'
              break
          }
        }
      }
    } else {
      focusToErrorTextField(this.$refs.form)
    }

    this.processing = false
  }
}
