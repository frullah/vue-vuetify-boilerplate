/* eslint-disable no-unreachable */
import api from '@/api'
import { focusToErrorTextField } from '@/utils/focus-to-error-text-field'
import { AxiosError } from 'axios'
import { BAD_REQUEST } from 'http-status-codes'
import { Component, Vue } from 'vue-property-decorator'

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
    if (this.sent || this.processing) return
    this.processing = true

    try {
      if (!await this.$validator.validateAll()) {
        focusToErrorTextField(this.$refs.form)
        return
      }

      await api.post('/users/reset-password', { email: this.email })
      this.sent = true
    } catch (error) {
      const { response }: AxiosError = error

      if (response === undefined) {
        this.error = this.$t('api.error.server') as string
        return
      }

      if (response.status === BAD_REQUEST) {
        const { data } = response.data
        if (data != null && data.disabled) {
          this.error = this.$t('user.disabled') as string
        } else {
          this.error = this.$t('user.notFound') as string
        }
      }
    } finally {
      this.processing = false
    }
  }
}
