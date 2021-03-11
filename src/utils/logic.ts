export function conditions<T>(arr: [boolean, T][], fallback: T): T {
  for (let i = 0, len = arr.length; i < len; i += 1) {
    if (arr[i][0]) {
      return arr[i][1]
    }
  }
  return fallback
}
