export function focusToElement (element: Element, selector: string) {
  const el = element.querySelector(selector)

  if (el !== null) {
    (el as HTMLElement).focus()
  }
}
