import { RadioProps } from '../Radio/Radio.props';

export type RadioCardProps = Omit<RadioProps, 'helperText' | 'validationText' | 'invalid'>;
