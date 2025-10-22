import { ColorValue } from '../types';
import { resolveThemeValue } from './themeValueHelpers';

type ThemeColor = string | { [key: string]: string | ThemeColor };

export default function getFlattenedColorValue(
  value?: string,
  colors?: Record<string, ThemeColor>
): ColorValue {
  if (!value) return undefined;

  return resolveThemeValue(value, colors) as ColorValue;
}
