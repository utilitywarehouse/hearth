import {GapProps} from '../../props/gap.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { FlexProps } from '../Flex/Flex.props';

export type ListItemProps = FlexProps & GapProps & ComponentPropsWithout<'li', RemovedProps>;
