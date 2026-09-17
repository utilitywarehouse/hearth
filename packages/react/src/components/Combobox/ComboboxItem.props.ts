import type { ComponentPropsWithRef } from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { FlexItemProps } from '../../props/flex-item.props';
import { JustifyContentProps } from '../../props/justify-content.props';
import { AlignItemsProps } from '../../props/align-items.props';
import { GapProps } from '../../props/gap.props';

export interface ComboboxItemProps
  extends
    Omit<ComponentPropsWithRef<typeof ComboboxPrimitive.Item>, 'className'>,
    FlexItemProps,
    AlignItemsProps,
    JustifyContentProps,
    GapProps {
  className?: string;
}
