import { FlexProps } from '../Flex/Flex.props';

export interface CardInteractionProps extends Omit<FlexProps, 'color' | 'backgroundColor' | 'as'> {
  secondary?: boolean;
}
