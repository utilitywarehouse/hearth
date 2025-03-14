import { kebabCase } from './kebab-case';

export function transformColorValue(colorValue: string) {
  return `var(--h-color-${kebabCase(colorValue)})`;
}
