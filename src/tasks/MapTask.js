import factory from './factory'
import isObject from 'lodash/isObject'

const { keys } = Object

export default class ArrayTask {
  constructor (schemaMap) {
    this.createSubTasks(schemaMap)
  }

  createSubTasks (schemaMap) {
    this.subTasks_ = keys(schemaMap).map(key => {
      return {
        key: key,
        task: factory(schemaMap[key])
      }
    }).reduce((prev, el) => {
      prev[el.key] = el.task
      return prev
    }, {})
  }

  exec (target, prefix = '[unknown]') {
    if (!isObject(target)) {
      throw new TypeError(`Stuffer validation error, target(${prefix}) is NOT an object.`)
    }

    keys(this.subTasks_).forEach(taskKey => {
      const subPrefix = `${prefix}/${taskKey}`
      const task = this.subTasks_[taskKey]

      task.exec(target[taskKey], subPrefix)
    })
  }
}
