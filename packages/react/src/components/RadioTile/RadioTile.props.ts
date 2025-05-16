import { RadioProps } from '../Radio/Radio.props';

export interface RadioTileProps extends Omit<RadioProps, 'label'> {
  label: RadioProps['label'];
}
