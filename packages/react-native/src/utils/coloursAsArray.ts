import { color } from '../tokens';

const { light, dark, ...restOfColors } = color;

export function extractLightColorValues(): Record<string, string> {
  return Object.entries(restOfColors).reduce(
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
  return [...Object.keys(restOfColors), ...Object.keys(extractLightColorValues())];
}
