function slice<T>(input: T[], start: number, size: number): T[] {
  const arr: T[] = new Array(size)
  let n = 0

  while (n < size) {
    arr[n] = input[start + n]
    n += 1
  }

  return arr
}

export function chunk<T>(input: T[], size: number): T[][] {
  const arr: T[][] = []

  if (typeof size !== 'number')
    throw new Error('`size` should be of type `number`')

  if (size >= 1) {
    let i = 0
    const len = input.length
    const withoutLast = len - size

    while (i < withoutLast) {
      arr.push(slice(input, i, size))
      i += size
    }

    const lastChunkSize = len - i

    if (lastChunkSize > 0)
      arr.push(slice(input, i, lastChunkSize))
  }

  return arr
}
