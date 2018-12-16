import * as _ from 'lodash'
import { chunk } from './chunk'

const arr = [0, 1, 2, 3, 4, 5]
const falsey = [null, undefined, false, 0, NaN, '']

describe('chunk', () => {
  describe('valid size', () => {
    test('should return empty array if size is 0', () => {
      expect(chunk(arr, 0)).toEqual([])
    })

    test('should return every item wrapper into an array', () => {
      expect(chunk(arr, 1)).toEqual([
        [0], [1], [2], [3], [4], [5],
      ])
    })

    test('should return chunked arrays', () => {
      const actual = chunk(arr, 3)

      expect(actual).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ])
    })

    test('should return the last chunk as remaining elements', () => {
      const actual = chunk(arr, 4)

      expect(actual).toEqual([
        [0, 1, 2, 3],
        [4, 5],
      ])
    })

    test('should work with big arrays', () => {
      const bigArr = Array(1000)

      const actual = chunk(bigArr, 3)
      const expected = _.chunk(bigArr, 3)

      expect(actual).toEqual(expected)
    })
  })

  describe('invalid size', () => {
    test('should treat undefined as 1', () => {
      const actual = [
        chunk(arr),
        chunk(arr, undefined),
      ]

      const expected = [
        [[0], [1], [2], [3], [4], [5]],
        [[0], [1], [2], [3], [4], [5]],
      ]

      expect(actual).toEqual(expected)
    })

    test('should treat falsey `size` values, except `undefined`, as `0`', () => {
      const values = falsey.filter((size) => size !== undefined)

      const actual = values.map((size) => chunk(arr, size))
      const expected = values.map((size) => [])

      expect(actual).toEqual(expected)
    })

    test('should ensure the minimum `size` is `0`', () => {
      const actual = [
        chunk(arr, -1),
        chunk(arr, -Infinity),
      ]

      const expected = [
        [],
        [],
      ]

      expect(actual).toEqual(expected)
    })
  })

  describe('coerce to an integer', () => {
    test('should treat 0.5001 as 0', () => {
      const actual = chunk(arr, 0.5001)
      const expected: any[] = []

      expect(actual).toEqual(expected)
    })

    test('should treat 1.5001 as 1', () => {
      const actual = chunk(arr, 1.5001)
      const expected = [[0], [1], [2], [3], [4], [5]]

      expect(actual).toEqual(expected)
    })

    test('should treat 3.9943 as 3', () => {
      const actual = chunk(arr, 3.9943)
      const expected = [
        [0, 1, 2],
        [3, 4, 5],
      ]

      expect(actual).toEqual(expected)
    })
  })

  test('should work as an iteratee for methods like `_.map`', () => {
    const actual = _.map([[1, 2], [3, 4], [5, 6], [7, 8]], chunk)
    const expected = [
      [[1], [2]],
      [[3], [4]],
      [[5], [6]],
      [[7], [8]],
    ]

    expect(actual).toEqual(expected)
  })
})
