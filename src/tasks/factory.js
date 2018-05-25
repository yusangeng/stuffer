import SimpleTask from './SimpleTask'
import ArrayTask from './ArrayTask'
import MapTask from './MapTask'

export default function taskFactory (schema) {
  if (schema.__isPlan) {
    return new SimpleTask(schema)
  }

  if (Array.isArray(schema)) {
    return new ArrayTask(schema)
  }

  return new MapTask(schema)
}
