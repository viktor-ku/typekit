import * as _ from 'lodash'
import { chunk } from './chunk'

const arr = [0, 1, 2, 3, 4, 5]
const falsey = [, null, undefined, false, 0, NaN, '']
const stubArray = () => []

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

  test('should treat falsey `size` values, except `undefined`, as `0`', () => {
    const expected = _.map(falsey, (value) =>
      (value === undefined) ? [[0], [1], [2], [3], [4], [5]] : [],
    )

    const actual = _.map(falsey, (size, index) =>
      (index) ? chunk(arr, size) : chunk(arr),
    )

    expect(actual).toMatchObject(expected)
  })

  test.skip('should ensure the minimum `size` is `0`', () => {
    const values = _.reject(falsey, _.isUndefined).concat(-1, -Infinity)
    const expected = _.map(values, stubArray)

    const actual = _.map(values, (n) => chunk(arr, n))

    expect(actual).toMatchObject(expected)
  })

  test.skip('should coerce `size` to an integer', () => {
    expect(chunk(arr, arr.length / 4)).toMatchObject([[0], [1], [2], [3], [4], [5]])
  })

  test.skip('should work as an iteratee for methods like `_.map`', () => {
    const actual = _.map([[1, 2], [3, 4]], chunk)

    expect(actual).toMatchObject([[[1], [2]], [[3], [4]]])
  })
})
