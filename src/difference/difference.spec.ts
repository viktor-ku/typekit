import { difference } from './difference'
import it from 'ava'

it('should return the difference of two arrays', t => {
  const a = [2, 1]
  const b = [2, 3]
  const actual = difference(a, b)
  const expected = [1]
  t.deepEqual(actual, expected)
})

it('should return the difference of multiple arrays', t => {
  const a = [2, 1, 2, 3]
  const b = [3, 4]
  const c = [3, 2]
  const actual = difference(a, b, c)
  const expected = [1]
  t.deepEqual(actual, expected)
})

it('should treat `-0` and `+0` as `0`', t => {
  const array = [-0, 0, +0]
  const actual = array.map((n) => difference(array, [n]))
  const expected = [[], [], []]
  t.deepEqual(actual, expected)
})

it('should work with strings', t => {
  const a = [-0, 1]
  const b = [1]
  const actual = difference(a, b).map((n) => n.toString())
  const expected = ['0']
  t.deepEqual(actual, expected)
})

it('should match NaN', t => {
  const a = [1, NaN, 3]
  const b = [NaN, 5, NaN]
  const actual = difference(a, b)
  const expected = [1, 3]
  t.deepEqual(actual, expected)
})

it('should work with large arrays', t => {
  const a: Array<number | {}> = [
    {},
    ...Array(1024).fill(0).map((_, i) => i),
    {},
    {}
  ]
  const b: Array<number | {}> = Array(1024).fill(0).map((_, i) => i)

  const actual = difference(a, b)
  const expected = [{}, {}, {}]

  t.deepEqual(actual, expected)
})
