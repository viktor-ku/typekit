import { chunk } from './chunk'
import it from 'ava'

it('should return empty array if size is `0`', t => {
  const actual = chunk([1, 2, 3, 4], 0)
  const expected: any[] = []
  t.deepEqual(actual, expected)
})

it('chunk array with size `1`', t => {
  const actual = chunk([1, 2, 3, 4], 1)
  const expected = [[1], [2], [3], [4]]
  t.deepEqual(actual, expected)
})

it('chunk array with size `3` into even chunks', t => {
  const actual = chunk([1, 2, 3, 4, 5, 6], 3)
  const expected = [
    [1, 2, 3],
    [4, 5, 6]
  ]
  t.deepEqual(actual, expected)
})

it('chunk array with size `3`', t => {
  const actual = chunk([1, 2, 3, 4], 3)
  const expected = [
    [1, 2, 3],
    [4]
  ]
  t.deepEqual(actual, expected)
})

it('should work with big array', t => {
  const actual = chunk(Array(1024).fill(0), 8)
  const expected = Array(128).fill([0, 0, 0, 0, 0, 0, 0, 0])
  t.deepEqual(actual, expected)
})

;[
  ['<empty>', ],
  ['undefined', undefined],
  ['null', null],
  ['str', 'size should not be a string :('],
  ['fn', function what() {}],
].forEach(([name, size]) => {
  it(`should throw an error if 'size' is ${name}`, t => {
    t.throws(() => {
      chunk([0], size)
    }, null, '`size` should be of type `number`')
  })
})
