import api from '@/api'
import { AxiosError } from 'axios'
import { Rule } from 'vee-validate'
import i18n from '@/i18n'

export const userAvailability: Rule = {
  getMessage (field, args, data) {
    return data.isError
      ? data.message
      : `The ${field} is ${data.message}`
  },
  async validate (value, args) {
    if (args === undefined) {
      throw new Error('args cannot be undefined')
    }

    const context = args[0] || 'user'
    const mustExists = args[1] === 'true' || args[1] !== 'false'
    let exists = false
    let isError = false
    let message: string | undefined

    try {
      const response = await api.get(
        '/user-availibility',
        { params: { context, value } }
      )
      // check is the user available for registered
      exists = (response.data.data.available === false)
    } catch (error) {
      isError = true
      const { response }: AxiosError = error
      if (response === undefined) {
        message = 'Cannot connect to the server'
      } else {
        message = 'an unexpected error occurred'
        console.log(error)
      }
    }

    if (message === undefined) {
      if (exists) {
        if (!mustExists) { message = 'already used' }
      } else {
        if (mustExists) { message = 'not available' }
      }
    }

    return {
      valid: (exists === mustExists),
      data: { message, isError }
    }
  }
}
