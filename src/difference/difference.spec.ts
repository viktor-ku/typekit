import { match } from '@/match'
import * as _ from 'lodash'
import { difference } from './difference'

const LARGE_ARRAY_SIZE = 200

const stubNaN = () => NaN
const stubOne = () => 1

describe('difference', () => {
  test('should return the difference of two arrays', () => {
    const a = [2, 1]
    const b = [2, 3]
    const actual = difference(a, b)
    const expected = [1]

    match(actual, expected, _.difference(a, b))
  })

  test('should return the difference of multiple arrays', () => {
    const a = [2, 1, 2, 3]
    const b = [3, 4]
    const c = [3, 2]
    const actual = difference(a, b, c)
    const expected = [1]

    match(actual, expected, _.difference(a, b, c))
  })

  test('should treat -0 and +0 as 0', () => {
    const array = [-0, 0, +0]
    const actual = array.map((n) => difference(array, [n]))
    const expected = [[], [], []]

    match(actual, expected, array.map((n) => _.difference(array, [n])))
  })

  test('should work with strings', () => {
    const a = [-0, 1]
    const b = [1]
    const actual = difference(a, b).map((n) => n.toString())
    const expected = ['0']

    match(actual, expected, _.difference(a, b).map((n) => n.toString()))
  })

  test('should match NaN', () => {
    const a = [1, NaN, 3]
    const b = [NaN, 5, NaN]
    const actual = difference(a, b)
    const expected = [1, 3]

    match(actual, expected, _.difference(a, b))
  })

  test('should work with large arrays', () => {
    const a: any[] = _.range(LARGE_ARRAY_SIZE + 1)
    const b: any[] = _.range(LARGE_ARRAY_SIZE)

    const item1 = {}
    const item2 = {}
    const item3 = {}

    a.push(item1, item2, item3)
    b.push(item2, item3, item1)

    const actual = difference(a, b)
    const expected = [LARGE_ARRAY_SIZE]

    match(actual, expected, _.difference(a, b))
  })

  test('should work with large arrays of -0 as 0', () => {
    const array = [-0, 0]

    let actual: any = array.map((n) => {
      return difference(
        array,
        _.times(LARGE_ARRAY_SIZE, _.constant(n)),
      )
    })

    let lodashActual: any = array.map((n) => {
      return _.difference(
        array,
        _.times(LARGE_ARRAY_SIZE, _.constant(n)),
      )
    })

    let expected: any[] = [[], []]

    match(actual, expected, lodashActual)

    const largeArray = _.times(LARGE_ARRAY_SIZE, stubOne)

    actual = difference([-0, 1], largeArray).map((n) => n.toString())
    lodashActual = _.difference([-0, 1], largeArray).map((n) => n.toString())

    expected = ['0']

    match(actual, expected, lodashActual)
  })

  test('should work with large arrays of NaN', () => {
    const largeArray = _.times(LARGE_ARRAY_SIZE, stubNaN)
    const actual = difference([1, NaN, 3], largeArray)
    const lodashActual = _.difference([1, NaN, 3], largeArray)
    const expected = [1, 3]

    match(actual, expected, lodashActual)
  })

  test('should work with large arrays of objects', () => {
    const item1 = {}
    const item2 = {}
    const largeArray = _.times(LARGE_ARRAY_SIZE, _.constant(item1))
    const actual = difference([item1, item2], largeArray)
    const lodashActual = _.difference([item1, item2], largeArray)
    const expected = [item2]

    match(actual, expected, lodashActual)
  })

  test('should ignore values that are not array-like', () => {
    const arr = [1, null, 3]
    const args = [1, 2, 3]

    match(
      difference(args, 3, { 0: 1 }),
      [1, 2, 3],
      _.difference(args, 3, { 0: 1 }),
    )

    match(
      difference(null, arr, 1),
      [],
      _.difference(null, arr, 1),
    )

    match(
      difference(arr, args, null),
      [null],
      _.difference(arr, args, null),
    )
  })
})
