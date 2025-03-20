import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type UnstyledIconButtonProps = ComponentPropsWithout<'button', RemovedProps> & {
  /**
   * An accessibility label that describes the button.
   * Make sure this label reflects the visual icon.
   */
  label: string;
};
