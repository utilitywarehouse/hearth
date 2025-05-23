import { MarginProps } from '../../props/margin.props';
import { RadioProps } from '../Radio/Radio.props';

export type RadioCardProps = Omit<RadioProps, 'helperText'> & MarginProps;
