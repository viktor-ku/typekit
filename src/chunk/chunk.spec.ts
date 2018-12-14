import * as _ from 'lodash'
import { chunk } from './chunk'

const arr = [0, 1, 2, 3, 4, 5]
const falsey = [, null, undefined, false, 0, NaN, '']

describe('chunk', () => {
  test('should return chunked arrays', () => {
    const actual = chunk(arr, 3)

    expect(actual).toMatchObject([
      [0, 1, 2],
      [3, 4, 5],
    ])
  })

  test('should return the last chunk as remaining elements', () => {
    const actual = chunk(arr, 4)

    expect(actual).toMatchObject([
      [0, 1, 2, 3],
      [4, 5],
    ])
  })

  test('should work with big arrays', () => {
    const bigArr = Array(1000).fill(0).map((item, i) => i)

    const actual = chunk(bigArr, 3)
    const expected = _.chunk(bigArr, 3)

    expect(actual).toMatchObject(expected)
  })

  test('should treat falsey `size` values, except `undefined`, as `0`', () => {
    const expected = _.map(falsey, (value) =>
      (value === undefined) ? [[0], [1], [2], [3], [4], [5]] : [],
    )

    const actual = _.map(falsey, (size, index) =>
      (index) ? chunk(arr, size) : chunk(arr),
    )

    expect(actual).toMatchObject(expected)
  })

  test('should ensure the minimum `size` is `0`', () => {
    const values = _.reject(falsey, _.isUndefined).concat(-1, -Infinity)
    const expected = _.map(values, () => [])

    const actual = _.map(values, (n) => chunk(arr, n))

    expect(actual).toMatchObject(expected)
  })

  describe('size as integer', () => {
    test('should treat 0.5 as 0', () => {
      expect(chunk(arr, 0.5)).toMatchObject([])
    })

    test('should treat 1.5 as 1', () => {
      expect(chunk(arr, 1.5)).toMatchObject([[0], [1], [2], [3], [4], [5]])
    })

    test('should treat 3.99 as 3', () => {
      expect(chunk(arr, 3.99)).toMatchObject([
        [0, 1, 2],
        [3, 4, 5],
      ])
    })
  })

  test('should work as an iteratee for methods like `_.map`', () => {
    const actual = _.map([[1, 2], [3, 4], [5, 6], [7, 8]], chunk)

    expect(actual).toMatchObject([
      [[1], [2]],
      [[3], [4]],
      [[5], [6]],
      [[7], [8]],
    ])
  })
})
