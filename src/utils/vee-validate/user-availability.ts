import api from '@/api'
import { AxiosError } from 'axios'
import { Rule } from 'vee-validate'

export const userAvailability: Rule = {
  getMessage (field, args, data) {
    return data.notChecked
      ? `The ${field} is ${data.message}`
      : `Cannot check ${field} to server`
  },
  async validate (value, args) {
    const context = args[0]
    const mustExists = args[1] === 'true' || args[1] !== 'false'
    let exists = false
    let notChecked = false
    let message: string | undefined

    try {
      const response = await api.get(
        '/user/availability',
        { params: { context, value } }
      )

      exists = response.status === 200
    } catch (error) {
      const { response }: AxiosError = error

      if (response === undefined) {
        message = 'Cannot connect to server'
      }
    }

    if (message === undefined) {
      if (exists) {
        if (!mustExists) {
          message = 'already used'
        }
      } else {
        if (mustExists) {
          message = 'not available'
        }
      }
    }

    return {
      valid: exists === mustExists && message === undefined,
      data: { message, notChecked }
    } as any
  }
}
