/* global describe it */

import 'babel-polyfill'
import chai from 'chai'
import { Stuffer, v } from '../src'

chai.should()

describe('Stuffer', _ => {
  describe('#constructor', _ => {
    it('should NOT throw', done => {
      const sf = new Stuffer(v.isString())
      void sf
      done()
    })
  })

  describe('#exec', _ => {
    it('"123" is string', done => {
      const sf = new Stuffer(v.isString())
      sf.exec('123')
      done()
    })

    it('123 is NOT string', done => {
      const sf = new Stuffer(v.isString())
      sf.exec.bind(sf, 123).should.throw()
      done()
    })

    it('default value "123" is string', done => {
      const sf = new Stuffer(v.isString(), '123')
      sf.exec()
      done()
    })

    it('default value 123 is NOT string', done => {
      const sf = new Stuffer(v.isString(), 123)
      sf.exec.bind(sf).should.throw()
      done()
    })
  })

  describe('#complex schema', _ => {
    const stuff = new Stuffer({
      a: v.isString(),
      b: [
        v.gt(1).lt(2),
        v.matchEmail()
      ],
      c: {
        d: {
          e: v.eq(1),
          f: v.isPlainObject()
        }
      }
    })

    it('good', done => {
      stuff.exec({
        a: 'xxx',
        b: [
          1.5,
          'abc@mail.com'
        ],
        c: {
          d: {
            e: 1,
            f: {}
          }
        }
      }, 'good')

      done()
    })

    it('bad', done => {
      stuff.exec.bind(stuff, {
        a: 'xxx',
        b: [
          1.5,
          'abc@mail.com'
        ],
        c: {
          d: {
            e: 1,
            f: '123'
          }
        }
      }, 'bad').should.throw()

      done()
    })
  })

  describe('#default value', _ => {
    it('default value', done => {
      const stuff = new Stuffer(v.isString(), 'xxx')
      const p = stuff.exec(undefined, 'p')

      p.should.be.eq('xxx')
      done()
    })

    it('merge default value', done => {
      const stuff = new Stuffer({
        a: v.isString(),
        b: {
          c: v.isNumber(),
          d: v.isArray()
        }
      }, {
        b: {
          d: [1, 2, 3]
        }
      })

      const p = stuff.exec({
        a: '123',
        b: {
          c: 123
        }
      }, 'p')

      p.b.d[0].should.be.eq(1)
      done()
    })
  })
})
