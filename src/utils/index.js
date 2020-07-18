/**
 * 检测是否是dom
 * @param {*} obj
 */
export function isElement(obj) {
  return typeof HTMLElement === 'object'
    ? obj instanceof HTMLElement
    : !!(
        obj &&
        typeof obj === 'object' &&
        (obj.nodeType === 1 || obj.nodeType === 9) &&
        typeof obj.nodeName === 'string'
      )
}
