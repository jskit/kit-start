export const { localStorage } = window
export class Storage {
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  }
  set(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  }
  remove(key) {
    localStorage.removeItem(key)
  }
  clear(key) {
    localStorage.removeItem(key)
  }
}

const storage = new Storage()
export default storage
