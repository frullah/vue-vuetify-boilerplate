import api from '@/api'
import { Component, Vue } from 'vue-property-decorator'
import { OK, NOT_FOUND } from 'http-status-codes'
import { AxiosError } from 'axios'
import { focusToErrorTextField } from '@/utils/focus-to-error-text-field'

@Component
export default class ResetPassword extends Vue {
  processing = false
  error: string | null = null
  email: string | null = null
  sent = false
  $refs!: {
    form: HTMLFormElement
  }

  get resetDisabled () {
    return !this.email || this.processing
  }

  get hasError () {
    return this.error !== null
  }

  async resetPassword () {
    if (this.processing) return
    this.processing = true

    if (await this.$validator.validateAll()) {
      try {
        const response = await api.post('/user/reset-password', {
          email: this.email
        })

        if (response.status === OK) {

        }
      } catch (error) {
        const { response }: AxiosError = error

        if (response === undefined) {
          this.error = 'Cannot connect to the server'
          return
        }

        const { status } = response
        if (status !== NOT_FOUND) {
          this.error = 'Server error'
          return
        }

        this.error = 'Username or email is not available'
      }
    } else {
      focusToErrorTextField(this.$refs.form)
    }

    this.processing = false
  }
}
