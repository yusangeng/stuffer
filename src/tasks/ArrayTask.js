import factory from './factory'

const { isArray } = Array

export default class ArrayTask {
  constructor (schemaElements) {
    this.createSubTasks(schemaElements)
  }

  createSubTasks (schemaElements) {
    this.subTasks_ = schemaElements.map(el => factory(el))
  }

  exec (target, prefix = '[unknown]') {
    if (!isArray(target)) {
      throw new TypeError(`Stuffer validation error, target(${prefix}) is NOT an array.`)
    }

    this.subTasks_.forEach((task, index) => {
      const subPrefix = `${prefix}/${index}`
      task.exec(target[index], subPrefix)
    })
  }
}
