const textarea = typeof document !== 'undefined' ? document.createElement('textarea') : null

export function decodeHTMLEntities(str: string): string {
  if (!textarea) return str
  textarea.innerHTML = str
  return textarea.value
}
