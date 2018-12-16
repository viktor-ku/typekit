export function chunk(input: any[], size?: number, collection?: any[]): any[][] {
  const arr: any[] = []

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
