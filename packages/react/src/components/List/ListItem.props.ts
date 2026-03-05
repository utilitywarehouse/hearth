import type { ComponentPropsWithRef } from 'react';
import { FlexProps } from '../Flex/Flex.props';
import { SizeProps } from '../../props/size.props';
import { GapProps } from '../../props/gap.props';

export interface ListItemProps
  extends
    ComponentPropsWithRef<'li'>,
    Pick<FlexProps, 'direction' | 'alignItems' | 'alignContent' | 'justifyContent' | 'wrap'>,
    SizeProps,
    GapProps {}
