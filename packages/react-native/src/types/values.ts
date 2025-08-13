import { AnimatableNumericValue, DimensionValue } from 'react-native';
import { lightTheme } from '../core/themes';
import color from '../tokens/color';

export type addPrefixToObject<T, P extends string> = {
  [K in keyof T as K extends string | number ? `${P}${K}` : never]: T[K];
};

export type ConvertNumbers<T> = T extends number
  ? string
  : T extends object
    ? { [K in keyof T]: ConvertNumbers<T[K]> }
    : T;

export type SpaceValue =
  | `${keyof (typeof lightTheme)['space'] & (string | number)}`
  | DimensionValue
  | undefined;

type OptionalSpace = '' | ' ';

export type RGB =
  `rgb(${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace})`;
export type RGBA =
  `rgba(${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace})`;
export type HEX = `#${string}`;
export type HSLA =
  | `hsla(${string})`
  | `hsla(${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace})`;
export type HSL =
  | `hsl(${string})`
  | `hsl(${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace},${OptionalSpace}${number}${OptionalSpace})`;

type FlattenColorKeys<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? { [K2 in keyof T[K]]: `${K & string}${K2 & string}` }[keyof T[K]]
    : K;
}[keyof T];

export type ColorValue =
  | 'currentColor'
  | 'transparent'
  | FlattenColorKeys<Omit<typeof color, 'light' | 'dark'> & { white: '#ffffff'; black: '#000000' }>
  | HSLA
  | HSL
  | RGB
  | RGBA
  | HEX
  | undefined;

export type BorderRadiusValue =
  | `${keyof (typeof lightTheme)['borderRadius'] & (string | number)}`
  | AnimatableNumericValue
  | undefined;

export type BordeWidthValue =
  | `${keyof (typeof lightTheme)['borderWidth'] & (string | number)}`
  | number
  | undefined;

export type OpacityValue = AnimatableNumericValue | undefined;
