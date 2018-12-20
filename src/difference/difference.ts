export function difference(array: any[], ...values: any[][]): any[] {
  if (!Array.isArray(array)) {
    return []
  }

  const memo = new Set(array)

  for (const value of values) {
    if (!Array.isArray(value)) {
      continue
    }

    for (const n of value) {
      if (memo.has(n)) {
        memo.delete(n)
      }
    }
  }

  return [...memo]
}
