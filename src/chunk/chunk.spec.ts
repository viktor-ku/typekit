import {
  chunk as lodashChunk,
  map as lodashMap,
} from 'lodash'
import { chunk } from './chunk'

const arr = [0, 1, 2, 3, 4, 5]
const falsey = [null, undefined, false, 0, NaN, '']

function match(actual: any, ...expected: any[]) {
  expected.forEach((ex) => {
    expect(actual).toEqual(ex)
  })
}

describe('chunk', () => {
  describe('valid size', () => {
    test('should return empty array if size is 0', () => {
      const actual = chunk(arr, 0)
      const expected: any[] = []

      match(actual, expected, lodashChunk(arr, 0))
    })

    test('should return every item wrapper into an array', () => {
      const actual = chunk(arr, 1)
      const expected = [
        [0], [1], [2], [3], [4], [5],
      ]

      match(actual, expected, lodashChunk(arr, 1))
    })

    test('should return chunked arrays', () => {
      const actual = chunk(arr, 3)
      const expected = [
        [0, 1, 2],
        [3, 4, 5],
      ]

      match(actual, expected, lodashChunk(arr, 3))
    })

    test('should return the last chunk as remaining elements', () => {
      const actual = chunk(arr, 4)
      const expected = [
        [0, 1, 2, 3],
        [4, 5],
      ]

      match(actual, expected, lodashChunk(arr, 4))
    })

    test('should work with big arrays', () => {
      const bigArr = Array(1000)

      const actual = chunk(bigArr, 3)
      const expected = lodashChunk(bigArr, 3)

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

      match(actual, expected, [
        lodashChunk(arr),
        lodashChunk(arr, undefined),
      ])
    })

    test('should treat falsey `size` values, except `undefined`, as `0`', () => {
      const withoutUndefined = falsey.filter((size) => size !== undefined)

      const actual = withoutUndefined.map((size) => chunk(arr, size))
      const expected = withoutUndefined.map(() => [])

      match(actual, expected, withoutUndefined.map((size) => lodashChunk(arr, size)))
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

      match(actual, expected, [
        lodashChunk(arr, -1),
        lodashChunk(arr, -Infinity),
      ])
    })
  })

  describe('coerce to an integer', () => {
    test('should treat 0.5001 as 0', () => {
      const size = 0.5001
      const actual = chunk(arr, size)
      const expected: any[] = []

      match(actual, expected, lodashChunk(arr, size))
    })

    test('should treat 1.5001 as 1', () => {
      const size = 1.5001
      const actual = chunk(arr, size)
      const expected = [[0], [1], [2], [3], [4], [5]]

      match(actual, expected, lodashChunk(arr, size))
    })

    test('should treat 3.9943 as 3', () => {
      const size = 3.9943
      const actual = chunk(arr, size)
      const expected = [
        [0, 1, 2],
        [3, 4, 5],
      ]

      match(actual, expected, lodashChunk(arr, size))
    })
  })

  test('should work as an iteratee for methods like `_.map`', () => {
    const actual = lodashMap([[1, 2], [3, 4], [5, 6], [7, 8]], chunk)
    const expectedFromLodash = lodashMap([[1, 2], [3, 4], [5, 6], [7, 8]], lodashChunk)
    const expected = [
      [[1], [2]],
      [[3], [4]],
      [[5], [6]],
      [[7], [8]],
    ]

    match(actual, expected, expectedFromLodash)
  })
})
