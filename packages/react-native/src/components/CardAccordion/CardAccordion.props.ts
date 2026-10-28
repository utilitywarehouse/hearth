import type { ComponentType, ReactNode } from 'react';
import type { GestureResponderEvent, ViewProps } from 'react-native';
import type { BaseButtonProps } from '../Button/Button.props';
import type { CardAccordionAction } from './CardAccordion.utils';

export interface CardAccordionProps extends ViewProps {
  /**
   * The `value` of the current step. Use with `onValueChange` to control the accordion.
   */
  value?: string;
  /**
   * The `value` of the step that is current on first render, when uncontrolled.
   * @default the first `CardAccordionItem`'s `value`
   */
  defaultValue?: string;
  /** Called with the new current step's `value` whenever the current step changes. */
  onValueChange?: (value: string) => void;
}

export interface CardAccordionItemProps extends Omit<ViewProps, 'hitSlop'> {
  /** A unique value identifying this step. Its position among the items sets the step order. */
  value: string;
  /** The step's heading. */
  title: string;
  /** Helper text shown under the heading. */
  description?: string;
  /** Replaces `title` once the step is completed. */
  summaryTitle?: string;
  /** Content shown once the step is completed, summarising the user's answers. */
  summaryDescription?: ReactNode;
  /** Label for the button that reopens a completed step. @default 'Edit' */
  editButtonText?: string;
  /** Called when the edit button of a completed step is pressed. */
  onEditPress?: (event: GestureResponderEvent) => void;
  /** Content shown while this is the current step, typically form fields and a `CardAccordionFooter`. */
  children?: ReactNode;
}

export type CardAccordionFooterProps = ViewProps;

export interface CardAccordionButtonProps extends Omit<
  BaseButtonProps,
  'variant' | 'colorScheme' | 'inverted' | 'children'
> {
  /**
   * Whether the button moves to the next or previous step. Sets the button's style and default label.
   */
  action: CardAccordionAction;
  /**
   * Label for the button.
   * @default 'Next' for `next`, 'Previous' for `previous`
   */
  children?: string;
  /** The icon to display on the button. */
  icon?: ComponentType;
  /**
   * The position of the icon.
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  /**
   * If `true`, the button shows a spinner.
   * @default false
   */
  loading?: boolean;
  /**
   * Called before the step changes. Call `event.preventDefault()` to stay on the current step,
   * for example when its fields fail validation.
   */
  onPress?: (event: GestureResponderEvent) => void;
}
