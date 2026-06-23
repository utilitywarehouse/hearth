'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import type { ToggleButtonProps } from './ToggleButton.props';

const COMPONENT_NAME = 'ToggleButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ToggleButtonElement = ComponentRef<'button'>;

export const ToggleButton = forwardRef<ToggleButtonElement, ToggleButtonProps>((props, ref) => {
  const { className, children, ...toggleButtonProps } = extractProps(props, flexItemPropDefs);

  return (
    <RadixToggleGroup.Item
      ref={ref}
      className={cn(componentClassName, className)}
      data-testid={componentClassName}
      {...toggleButtonProps}
    >
      <TickSmallIcon />
      {children}
    </RadixToggleGroup.Item>
  );
});

ToggleButton.displayName = COMPONENT_NAME;
