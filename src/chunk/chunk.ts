export function chunk<T>(input: T[], size?: number, collection?: any[]): T[][] {
  const arr = []

  if (size === undefined || collection) {
    size = 1
  }

  size = Math.floor(size)

  if (size >= 1) {
    for (let i = 0, len = input.length; i < len; i += size) {
      const end = i + size

      arr.push(input.slice(i, end))
    }
  }

  return arr
}
