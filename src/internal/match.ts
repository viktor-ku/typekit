export function match(actual: any, ...expected: any[]) {
  expected.forEach((ex) => {
    expect(actual).toEqual(ex)
  })
}
