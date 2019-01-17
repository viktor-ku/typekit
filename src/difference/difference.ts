const isArray = Array.isArray

export function difference<T = any>(input: T[], ...values: T[][]): T[] {
  if (!isArray(input)) {
    return []
  }

  const set = new Set(input)

  for (const value of values) {
    if (!isArray(value)) {
      continue
    }

    for (const n of value) {
      set.delete(n)
    }
  }

  return [...set]
}
