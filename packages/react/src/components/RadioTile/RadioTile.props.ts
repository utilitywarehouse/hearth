import type { ReactNode } from 'react';
import { RadioProps } from '../Radio/Radio.props';
import { FlexItemProps } from '../../props/flex-item.props';

export interface RadioTileProps extends Omit<RadioProps, 'label'>, FlexItemProps {
  /**
   * The label for the RadioTile. If not using please properly associate the
   * RadioTile with a label using the `aria-label` or `aria-labelledby` props.
   */
  label: RadioProps['label'];
  /** Optional badge content, displayed below the label and helper text. */
  badge?: ReactNode;
}
