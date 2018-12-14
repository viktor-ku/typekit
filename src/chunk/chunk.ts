export function chunk(input: any[], size: number): any[][] {
  const arr = []

  for (let i = 0, len = input.length; i < len; i += size) {
    const start = i
    const end = (size * i) || size

    arr.push(input.slice(start, end))
  }

  return arr
}
