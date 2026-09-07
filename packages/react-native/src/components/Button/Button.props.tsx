import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

export type ButtonVariants =
  | {
      /**
       * The variant of the button.
       * @default 'solid'
       */
      variant?: 'solid';
      /**
       * The color scheme of the button.
       * @default 'highlight'
       */
      colorScheme?: 'affirmative' | 'destructive';
      /**
       * Whether the button uses an inverted (light-on-dark) style, for use on
       * `midnight` or `purple` backgrounds.
       */
      inverted?: never;
    }
  | {
      /**
       * The variant of the button.
       * @default 'solid'
       */
      variant?: 'outline';
      /**
       * The color scheme of the button.
       * @default 'highlight'
       */
      colorScheme: 'affirmative' | 'destructive';
      /**
       * Whether the button uses an inverted (light-on-dark) style, for use on
       * `midnight` or `purple` backgrounds.
       */
      inverted?: never;
    }
  | {
      /**
       * The variant of the button.
       * @default 'solid'
       */
      variant?: 'ghost';
      /**
       * The color scheme of the button.
       * @default 'highlight'
       */
      colorScheme: 'affirmative' | 'destructive';
      /**
       * Whether the button uses an inverted (light-on-dark) style, for use on
       * `midnight` or `purple` backgrounds.
       */
      inverted?: never;
    }
  | {
      /**
       * The variant of the button.
       * @default 'solid'
       */
      variant?: 'emphasis';
      /**
       * The color scheme of the button.
       * @default 'highlight'
       */
      colorScheme?: 'highlight';
      /**
       * Whether the button uses an inverted (light-on-dark) style, for use on
       * `midnight` or `purple` backgrounds.
       */
      inverted?: boolean;
    }
  | {
      /**
       * The variant of the button.
       * @default 'solid'
       */
      variant?: 'solid';
      /**
       * The color scheme of the button.
       * @default 'highlight'
       */
      colorScheme?: 'highlight';
      /**
       * Whether the button uses an inverted (light-on-dark) style, for use on
       * `midnight` or `purple` backgrounds.
       */
      inverted?: boolean;
    }
  | {
      /**
       * The variant of the button.
       * @default 'solid'
       */
      variant?: 'outline';
      /**
       * The color scheme of the button.
       * @default 'highlight'
       */
      colorScheme: 'functional';
      /**
       * Whether the button uses an inverted (light-on-dark) style, for use on
       * `midnight` or `purple` backgrounds.
       */
      inverted?: boolean;
    }
  | {
      /**
       * The variant of the button.
       * @default 'solid'
       */
      variant?: 'ghost';
      /**
       * The color scheme of the button.
       * @default 'highlight'
       */
      colorScheme: 'functional';
      /**
       * Whether the button uses an inverted (light-on-dark) style, for use on
       * `midnight` or `purple` backgrounds.
       */
      inverted?: boolean;
    };

export type BaseButtonProps = Omit<PressableProps, 'children'> & {
  /**
   * If `true`, the button will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /**
   * Changes the button to a pressed state.
   * @default false
   */
  pressed?: boolean;
  /**
   * Removes the horizontal padding from the button (only applies to `sm` size `ghost` variant buttons).
   * @default false
   */
  paddingNone?: boolean;
  /** Content rendered inside the button. */
  children?: ViewProps['children'];
} & ButtonVariants;

export type ButtonWithoutChildrenProps = BaseButtonProps & {
  children?: never;
  /** Text to display in the button, used in place of `children`. */
  text?: string;
  /**
   * The icon to display on the button.
   * @default undefined
   */
  icon?: ComponentType;
  /**
   * The position of the icon.
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  /**
   * If `true`, the button will show a spinner.
   * @default false
   */
  loading?: boolean;
};

export type ButtonWithStringChildrenProps = BaseButtonProps & {
  /**
   * The content of the button.
   */
  children: string | number | null | undefined;
  /**
   * The icon to display on the button.
   * @default undefined
   */
  icon?: ComponentType;
  /**
   * The position of the icon.
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  /**
   * If `true`, the button will show a spinner.
   * @default false
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
