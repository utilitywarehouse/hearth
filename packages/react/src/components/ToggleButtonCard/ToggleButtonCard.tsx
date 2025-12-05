'use client';

import * as React from 'react';
import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ToggleButtonCardProps } from './ToggleButtonCard.props';
import { Card } from '../Card/Card';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'ToggleButtonCard';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ToggleButtonCardElement = ElementRef<'button'>;

export const ToggleButtonCard = React.forwardRef<ToggleButtonCardElement, ToggleButtonCardProps>(
  (
    {
      className,
      children,
      label,
      alignItems,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        direction="column"
        alignItems={alignItems}
        className={clsx(componentClassName, className)}
      >
        {children}
        <RadixToggleGroup.Item
          ref={ref}
          {...props}
          className={`${componentClassName}Item`}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
        >
          <TickSmallIcon />
          {label}
        </RadixToggleGroup.Item>
      </Card>
    );
  }
);

ToggleButtonCard.displayName = COMPONENT_NAME;
