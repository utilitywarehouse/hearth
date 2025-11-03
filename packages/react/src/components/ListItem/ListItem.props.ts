import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { FlexProps } from '../Flex/Flex.props';
import { SizeProps } from '../../props/size.props';
import { GapProps } from '../../props/gap.props';

export type ListItemProps = ComponentPropsWithout<'li', RemovedProps> &
  Pick<FlexProps, 'direction' | 'alignItems' | 'alignContent' | 'justifyContent' | 'wrap'> &
  SizeProps &
  GapProps;
