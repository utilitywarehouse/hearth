export interface DescriptionListItemProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'color'> {
  /**
   * Description term
   */
  heading: string;
  /**
   * Description details
   */
  description: string;
  /**
   * Optional link element
   */
  link?: React.ReactNode;
  /**
   * Indicates the validation state
   */
  validationStatus?: 'invalid';
  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;
}
