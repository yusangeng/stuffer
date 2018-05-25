import check from 'param-check'

check.registerCheck({
  // 用来占位的
  any: _ => _
})

export default class SimpleTask {
  constructor (plan) {
    this.plan_ = plan
  }

  exec (target, prefix = '[unknown]') {
    try {
      check(target, prefix).meet(this.plan_)
    } catch (err) {
      throw new TypeError(err.message.replace('[PARAM-CHECK]', 'Stuffer validation error,'))
    }
  }
}
