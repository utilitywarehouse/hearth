// Converts a string to kebab case
export function kebabCase(value: string) {
  return value.replace(/([a-z])([1-9 A-Z])/g, '$1-$2').toLowerCase();
}
