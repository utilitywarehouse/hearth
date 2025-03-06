import { kebabCase } from './kebab-case';

export function transformColorValue(colorValue: string) {
  return `var(--color-${kebabCase(colorValue)})`;
}
