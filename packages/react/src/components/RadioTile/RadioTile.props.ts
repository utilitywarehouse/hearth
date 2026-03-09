import type { ReactNode } from 'react';
import { RadioProps } from '../Radio/Radio.props';
import { FlexItemProps } from '../../props/flex-item.props';

export interface RadioTileProps extends Omit<RadioProps, 'label'>, FlexItemProps {
  label: RadioProps['label'];
  badge?: ReactNode;
}
