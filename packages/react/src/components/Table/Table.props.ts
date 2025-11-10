import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type TableProps = ComponentPropsWithout<'table', RemovedProps> & {
  /**
   * The container variant of the table
   * @default 'subtle'
   */
  containerVariant?: 'subtle' | 'emphasis' | 'none';
};
