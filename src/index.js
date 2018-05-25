import Stuffer from './Stuffer'
import stuff from './stuff'
import check from 'param-check'

export default function stuffer (schema, defaultValue) {
  return new Stuffer(schema, defaultValue)
}

const v = check.plan

export { Stuffer, stuffer, stuff, v }
