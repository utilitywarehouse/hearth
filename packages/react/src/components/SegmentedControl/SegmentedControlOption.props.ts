import type { ComponentPropsWithRef, ReactNode } from 'react';

export type SegmentedControlOptionProps = Omit<ComponentPropsWithRef<'button'>, 'value'> & {
  /**
   * The value that identifies this option within the SegmentedControl.
   */
  value: string;
  /**
   * An icon to display before the label. Use the Small icon variant for `size="sm"` and
   * the Medium icon variant for `size="md"`. When using the responsive `size` prop, see
   * the docs for guidance on rendering responsive icons.
   */
  icon?: ReactNode;
};
