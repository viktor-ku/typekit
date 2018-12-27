function slice<T>(input: T[], start: number, size: number): T[] {
  const arr: T[] = new Array(size)
  let n = 0

  while (n < size) {
    arr[n] = input[start + n]
    n++
  }

  return arr
}

export function chunk<T>(input: T[], size?: number, collection?: any[]): T[][] {
  const arr: T[][] = []

  if (size === undefined || collection) {
    size = 1
  }

  size = Math.floor(size)

  if (size >= 1) {
    let i = 0
    const len = input.length
    const withoutLast = len - size

    // Push full slices
    while (i < withoutLast) {
      arr.push(slice(input, i, size))
      i += size
    }

    const lastChunkSize = len - i

    // Push last slice (if there is one) that can be either full or partial
    if (lastChunkSize > 0) {
      arr.push(slice(input, i, lastChunkSize))
    }
  }

  return arr
}
