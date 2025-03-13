import { FlexProps } from '../Flex/Flex.props';

export interface CardActionProps extends Omit<FlexProps, 'color' | 'backgroundColor' | 'as'> {
  secondary?: boolean;
}
