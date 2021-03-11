export function joinSpace(...args: (string | null | undefined | boolean)[]): string {
  return args.filter(Boolean).join(" ")
}
