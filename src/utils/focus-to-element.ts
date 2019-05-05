const fnName = 'focus'

export function focusToElement (element: Element, selector: string) {
  const el = element.querySelector(selector)

  if (el !== null && typeof el[fnName] === 'function') {
    el[fnName]()
  }
}
