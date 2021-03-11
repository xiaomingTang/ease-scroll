export function isNil(val: any): val is (null | undefined) {
  return val === null || val === undefined
}
