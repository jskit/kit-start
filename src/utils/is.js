export function isDef(value) {
  return value !== undefined && value !== null
}

export function isObj(x) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}
