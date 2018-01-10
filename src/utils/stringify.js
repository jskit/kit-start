export default function stringify(params) {
  const arr = []
  for (const key in params) {
    if (!params[key]) {
      delete params[key]
    } else {
      arr.push(`${key}=${params[key]}`)
    }
  }
  return arr.join('&')
}
