import { MarginProps } from '../../props/margin.props';
import { TextTransformProps } from '../../props/text-transform.props';

interface CommonLabelProps extends MarginProps, TextTransformProps {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * Cannot be used in combination with `asChild`.
   * @default label
   */
  as?: 'label' | 'span';
  variant?: 'body' | 'heading';
  fontWeight?: 'regular' | 'semibold';
  /** Set the label appearance to disabled */
  disabled?: boolean;
  /** Make the text unselectable, for use when associated with input elements. */
  disableUserSelect?: boolean;
}
type LabelSpanProps = { as?: 'span' } & Omit<React.ComponentPropsWithRef<'span'>, 'color'>;
type LabelLabelProps = { as: 'label' } & Omit<React.ComponentPropsWithRef<'label'>, 'color'>;
export type LabelProps = CommonLabelProps & (LabelSpanProps | LabelLabelProps);
