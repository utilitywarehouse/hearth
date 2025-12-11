'use client';

import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Combobox as BaseUICombobox } from '@base-ui-components/react/combobox';
import { ComboboxItemProps } from './ComboboxItem.props';

const COMPONENT_NAME = 'ComboboxItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ComboboxItem = ({ className, children, ...props }: ComboboxItemProps) => {
  return (
    <BaseUICombobox.Item className={clsx(componentClassName, className)} {...props}>
      <div>{children}</div>
      <BaseUICombobox.ItemIndicator className={`${componentClassName}Indicator`}>
        <TickSmallIcon />
      </BaseUICombobox.ItemIndicator>
    </BaseUICombobox.Item>
  );
};

ComboboxItem.displayName = COMPONENT_NAME;
