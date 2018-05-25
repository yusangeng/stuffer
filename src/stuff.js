import Stuffer from './Stuffer'

export default function stuff (...stuffers) {
  const sfs = stuffers.map(el => {
    if (el instanceof Stuffer) {
      return el
    }

    // 此时不支持默认值
    return new Stuffer(el)
  })

  return function validationDecorator (clazz, key, descriptor) {
    const fn = descriptor.value

    descriptor.value = function (...args) {
      sfs.forEach((sf, index) => {
        const arg = args[index]
        args[index] = sf.exec(arg, `arguments[${index}]`)
      })

      return fn.call(this, ...args)
    }

    return descriptor
  }
}
