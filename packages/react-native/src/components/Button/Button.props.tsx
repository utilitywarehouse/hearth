import type { ReactNode, ComponentType, ReactElement } from 'react';
import type { PressableProps } from 'react-native';

export type ButtonVariants =
  | { variant?: 'solid'; colorScheme?: 'green' | 'red'; inverted?: never }
  | { variant?: 'outline'; colorScheme: 'green' | 'red'; inverted?: never }
  | { variant?: 'ghost'; colorScheme: 'green' | 'red'; inverted?: never }
  | { variant?: 'emphasis'; colorScheme?: 'yellow'; inverted?: boolean }
  | { variant?: 'solid'; colorScheme?: 'yellow'; inverted?: boolean }
  | { variant?: 'outline'; colorScheme: 'grey'; inverted?: boolean }
  | { variant?: 'ghost'; colorScheme: 'grey'; inverted?: boolean };

export type BaseButtonProps = Omit<PressableProps, 'children'> & {
  /*
   * If `true`, the button will be disabled.
   * @default  false
   */
  disabled?: boolean;
  size?: 'sm' | 'md';
  pressed?: boolean;
  paddingNone?: boolean;
} & ButtonVariants;

export type ButtonWithoutChildrenProps = BaseButtonProps & {
  children?: never;
  text?: string;
  /*
   * The icon to display on the button.
   * @default undefined
   */
  icon?: ComponentType;
  /*
   * The position of the icon.
   * @default  'left'
   */
  iconPosition?: 'left' | 'right';
  /*
   * If `true`, the button will show a spinner.
   * @default  false
   */
  loading?: boolean;
};

export type ButtonWithStringChildrenProps = BaseButtonProps & {
  /*
   * The content of the button.
   */
  children: string | number | null | undefined;
  /*
   * The icon to display on the button.
   * @default undefined
   */
  icon?: ComponentType;
  /*
   * The position of the icon.
   * @default  'left'
   */
  iconPosition?: 'left' | 'right';
  /*
   * If `true`, the button will show a spinner.
   * @default  false
   */
  loading?: boolean;
  text?: never;
};

type ReactNodeWithoutStringOrNumber = Exclude<ReactNode, string | number | Iterable<ReactNode>>;

export type ButtonWithOtherChildernProps = BaseButtonProps & {
  children:
    | ReactNodeWithoutStringOrNumber
     
    | ReactElement<any, React.JSXElementConstructor<any>>
    | Iterable<ReactNodeWithoutStringOrNumber>;
  icon?: never;
  iconPosition?: never;
  loading?: never;
  text?: never;
};

export type ButtonProps =
  | ButtonWithStringChildrenProps
  | ButtonWithOtherChildernProps
  | ButtonWithoutChildrenProps;
