import { FlexProps } from '../Flex/Flex.props';
import { SizeProps } from '../../props/size.props';
import { GapProps } from '../../props/gap.props';

export type ListItemProps = React.ComponentPropsWithRef<'li'> &
  Pick<FlexProps, 'direction' | 'alignItems' | 'alignContent' | 'justifyContent' | 'wrap'> &
  SizeProps &
  GapProps;
