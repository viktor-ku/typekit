const isArray = Array.isArray

export function difference<T = any>(input: T[], ...values: T[][]) {
  const set = new Set(input)

  for (const value of values)
    for (const n of value)
      set.delete(n)

  return [...set]
}
