export function chunk(input: any[], size?: any, _?: any): any[][] {
  const arr: any[] = []

  if (_) {
    size = 1
  }

  if (size >= 2) {
    size = Math.floor(size)

    for (let i = 0, len = input.length; i < len; i += size) {
      const end = i + size

      arr.push(input.slice(i, end))
    }
  } else if (
    (size === undefined) ||
    (size >= 1 && size < 2)
  ) {
    return input.map((item) => [item])
  }

  return arr
}
