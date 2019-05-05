import { focusToElement } from './focus-to-element'

export function focusToErrorTextField (element: Element) {
  focusToElement(element, '.v-text-field.error--text input')
}
