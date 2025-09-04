import { AnimatableNumericValue, DimensionValue } from 'react-native';
import { lightTheme, themes } from '../core/themes';
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

// Helper type to convert string to camel case
type ToCamelCase<S extends string> = S extends `${infer P1}-${infer P2}${infer P3}`
  ? `${P1}${Uppercase<P2>}${ToCamelCase<P3>}`
  : S;

// Helper to capitalise first letter
type Capitalise<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

// Recursive function to flatten and camel case color keys
export type FlattenColorKeys<T> =
  T extends Record<string, unknown>
    ? {
        [K in keyof T]: T[K] extends string
          ? ToCamelCase<K & string>
          : T[K] extends Record<string, unknown>
            ? FlattenColorKeys<T[K]> extends infer Nested
              ? Nested extends string
                ? ToCamelCase<`${K & string}${Capitalise<Nested>}`>
                : never
              : never
            : never;
      }[keyof T]
    : never;

export type ColorValue =
  | 'currentColor'
  | 'transparent'
  | FlattenColorKeys<Omit<typeof color, 'light' | 'dark'> & { white: '#ffffff'; black: '#000000' }>
  | FlattenColorKeys<(typeof color)['light']>
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

export type SpacingValues = keyof (typeof themes)['light']['globalStyle']['variants']['space'];
