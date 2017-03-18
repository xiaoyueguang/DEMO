function verify (field, value) {

}
/**
 * 匹配手机
 * @param {string} value 验证的值
 */
function verifyPhone (value) {
  let reg = /^(13|18|15)[0-9]{9}$/
  return reg.test(value)
}
/**
 * 判断是否重复
 * @param {string} value 验证的值
 */
function verifyRepeat (value) {
  let arr = verifyWord(value)
  let result = false
  // 利用排序 取相邻的两个值, 判断是否相等
  arr.sort((a, b) => {
    if (a === b) result = true
  })
  return result
}

/**
 * 匹配单词
 * @param {string} value 验证的值
 */
function verifyWord (value) {
  let reg = /\b[a-zA-Z]+\b/g
  return value.match(reg)
}