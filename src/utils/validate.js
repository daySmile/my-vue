/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsernameOld(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 密码由字母、数字、下划线组成，以字母开头，长度为6-18位 */
export function isPassWord(str) {
  return /^[a-zA-Z]\w{5,17}$/.test(str)
}

/**
 * 上面是正则验证返回true或false  用is开头
 * ==============================================================================================
 * 下面是表单验证规则  用valid开头
*/

/* 账号 */
export function validUsername(rule, value, callback) {
  if (value) {
    const reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('账号由字母、数字、下划线组成，以字母开头，长度为5-16位'))
    }
  } else {
    if (rule.required) { // 必填
      return callback(new Error('请输入账号'))
    } else { // 非必填
      callback()
    }
  }
}

/* 密码 必填 */
export function validPassword(rule, value, callback) {
  if (value) {
    const reg = /^[a-zA-Z]\w{5,17}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('密码由字母、数字、下划线组成，以字母开头，长度为6-18位'))
    }
  } else {
    if (rule.required) { // 必填
      return callback(new Error('请输入密码'))
    } else { // 非必填
      callback()
    }
  }
}

/* 手机号 */
export function validPhone(rule, value, callback) {
  if (value) {
    const reg = /^1[3456789]\d{9}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  } else {
    if (rule.required) { // 必填
      return callback(new Error('请输入手机号'))
    } else { // 非必填
      callback()
    }
  }
}

/* 由大写字母、数字、下划线组成，以大写字母开头 */
export function validEncode1(rule, value, callback) {
  if (value) {
    const reg = /^[A-Z][0-9A-Z_]{1,}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('由大写字母、数字、下划线组成，以大写字母开头'))
    }
  } else {
    if (rule.required) { // 必填
      return callback(new Error('请输入编码'))
    } else { // 非必填
      callback()
    }
  }
}

/* 由字母、数字、下划线组成，以字母开头 */
export function validEncode2(rule, value, callback) {
  if (value) {
    const reg = /^[a-zA-Z][0-9a-zA-Z_]{1,}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('由字母、数字、下划线组成，以字母开头'))
    }
  } else {
    if (rule.required) { // 必填
      return callback(new Error('请输入编码'))
    } else { // 非必填
      callback()
    }
  }
}

/* 由字母、数字、下划线组成 */
export function validCode2(rule, value, callback) {
  if (value) {
    const reg = /^[0-9a-zA-Z_]{1,}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('由字母、数字、下划线组成'))
    }
  } else {
    if (rule.required) { // 必填
      return callback(new Error('请输入编码'))
    } else { // 非必填
      callback()
    }
  }
}

/* 标识符 由大写字母或下划线组成，以大写字母开头 */
export function validMarkerCode(rule, value, callback) {
  if (value) {
    const reg = /^[A-Z][A-Z_]{1,}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('由大写字母或下划线组成，以大写字母开头'))
    }
  } else {
    if (rule.required) { // 必填
      return callback(new Error('请输入标识符'))
    } else { // 非必填
      callback()
    }
  }
}

/* 非零正整数 */
export function validNumber(rule, value, callback) {
  const reg = /^[1-9]\d*$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入非零正整数'))
  }
}
