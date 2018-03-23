export function formatDel(value, pre = '') {
  // 返回处理后的值
  if (!value) return null
  return `${pre}${Number(value * 0.01).toFixed(2)}`
}
