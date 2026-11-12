import type { ReactNode } from 'react';
import { LabelProps } from '../Label/Label.props';

export interface RadioProps {
  /** The unique identifying value of the radio within its group. */
  value: string;
  /** Whether the radio should ignore user interaction. */
  disabled?: boolean;
  /** Whether the user must choose a value before submitting a form. */
  required?: boolean;
  id?: string;
  className?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  children?: ReactNode;
  /**
   * Merges the component's props onto its immediate child instead of
   * rendering its own DOM element, so the child determines the rendered tag.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * The label for the Radio. If not using please properly associate the
   * Radio with a label using the `aria-label` or `aria-labelledby` props.
   */
  label?: ReactNode;
  /** Overrides the font weight of the label. */
  labelFontWeight?: LabelProps['fontWeight'];
  /** Helper text for the Radio. Will not display if the radio group has `helperText` set. */
  helperText?: ReactNode;
  /** Optional image to show between the radio indicator and label. */
  image?: ReactNode;
}
