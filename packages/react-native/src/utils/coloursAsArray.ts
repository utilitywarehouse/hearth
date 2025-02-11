import { color } from '@utilitywarehouse/hearth-tokens';

export function extractLightColorValues(): Record<string, string> {
  return Object.entries(color.light).reduce(
    (acc, [colorName, variants]) => {
      Object.entries(variants).forEach(([variantName, hexValue]) => {
        acc[`${colorName}${variantName}`] = hexValue;
      });
      return acc;
    },
    {} as Record<string, string>
  );
}

export default function coloursAsArray(): Array<string> {
  return [...Object.keys(color.common), ...Object.keys(extractLightColorValues())];
}
