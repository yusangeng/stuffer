/* global describe it */

// import 'babel-polyfill'
import chai from 'chai'
import { stuff, v } from '../src'

chai.should()

describe('stuff', _ => {
  describe('@stuff', _ => {
    class Foo {
      @stuff(v.isString(), v.isNumber())
      bar (str, num) {
        console.log(`Foo.bar: str = ${str}, num=${num}.`)
      }
    }

    it('should NOT throw', done => {
      const foo = new Foo()
      foo.bar('abc', 123)
      done()
    })

    it('should throw', done => {
      const foo = new Foo()
      foo.bar.bind(foo, 'abc', {}).should.throw()
      done()
    })
  })
})
