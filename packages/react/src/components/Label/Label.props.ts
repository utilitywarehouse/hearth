import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { TextTransformProps } from '../../props/text-transform.props';

export interface CommonLabelProps extends MarginProps, TextTransformProps {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * Cannot be used in combination with `asChild`.
   * @default label
   */
  as?: 'label' | 'span';
  /**
   * Sets the visual style of the label, rendering it as `BodyText` or as a
   * `Heading`.
   *
   * @default 'body'
   */
  variant?: 'body' | 'heading';
  /**
   * Sets the font-weight when `variant` is `'body'`.
   *
   * @default 'regular'
   */
  fontWeight?: 'regular' | 'semibold';
  /** Set the label appearance to disabled */
  disabled?: boolean;
  /** Make the text unselectable, for use when associated with input elements. */
  disableUserSelect?: boolean;
}
/** Renders a `span` element. */
type LabelSpanProps = { as?: 'span' } & Omit<ComponentPropsWithRef<'span'>, 'color'>;
/** Renders a `label` element. This is the default. */
type LabelLabelProps = { as: 'label' } & Omit<ComponentPropsWithRef<'label'>, 'color'>;
export type LabelProps = CommonLabelProps & (LabelSpanProps | LabelLabelProps);
