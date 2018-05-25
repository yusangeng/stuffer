import merge from 'deepmerge'
import isUndefined from 'lodash/isUndefined'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'
import factory from './tasks/factory'

export default class Stuffer {
  constructor (schema, defaultValue) {
    if (isFunction(schema)) {
      // v.isString忘了加括号的情况, 正确的方法是v.isString()
      throw new TypeError('Illegal schema.')
    }

    this.task_ = factory(schema)
    this.defaultValue_ = defaultValue
  }

  exec (target, prefix) {
    let t = target
    const def = this.defaultValue_

    if (isUndefined(target)) {
      if (isObject(def)) {
        t = merge({}, def)
      } else {
        t = def
      }
    } else if (isObject(def)) {
      t = merge(target, def)
    }

    this.task_.exec(t, prefix)

    return t
  }
}
