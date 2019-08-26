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

  get hasError () {
    return this.error !== null
  }

  async login () {
    if (this.processing) return
    this.processing = true
    this.error = null

    if (!await this.$validator.validateAll()) {
      this.processing = false
      focusToErrorTextField(this.$refs.form)
      return
    }

    try {
      const response = await this.$store.dispatch('user/LOGIN', {
        username: this.username,
        password: this.password
      })

      if (response.status === OK) {
        this.$router.push('/')
      }
    } catch (error) {
      const { response }: AxiosError = error

      if (response === undefined) {
        this.error = this.$t('api.error.server') as string
        return
      }

      switch (response.status) {
        case FORBIDDEN:
          this.error = this.$t('user.disabled') as string
          break

        case BAD_REQUEST:
        case UNAUTHORIZED:
          this.error = this.$t('user.incorrect') as string
          break
      }
    } finally {
      this.processing = false
    }
  }
}
