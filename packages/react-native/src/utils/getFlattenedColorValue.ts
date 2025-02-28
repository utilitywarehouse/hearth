import { ColorValue } from '../types';

type ThemeColor = string | Record<string, string>;

export default function getFlattenedColorValue(
  value?: string,
  colors?: Record<string, ThemeColor>
): ColorValue {
  if (!value) return undefined;

  if (colors?.[value] && typeof colors?.[value] === 'string') {
    return colors?.[value] as ColorValue;
  }

  // Extract trailing digits as shade
  const shadeMatch = value.match(/\d+$/);

  if (!shadeMatch) return value as ColorValue;
  const shade = shadeMatch[0];
  const base = value.slice(0, -shade.length);

  if (shade && typeof base !== 'string') return value as ColorValue;

  const colorEntry = colors?.[base];

  if (typeof colorEntry === 'object') {
    return (colorEntry[shade] ?? value) as ColorValue;
  } else if (typeof colorEntry === 'string') {
    return colorEntry as ColorValue;
  }
  return value as ColorValue;
}
