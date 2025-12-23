'use client';

import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToggleButtonCardProps } from './ToggleButtonCard.props';
import { Card } from '../Card/Card';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'ToggleButtonCard';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToggleButtonCard = ({
  className,
  children,
  label,
  alignItems,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}: ToggleButtonCardProps) => {
  return (
    <Card direction="column" alignItems={alignItems} className={cn(componentClassName, className)}>
      {children}
      <RadixToggleGroup.Item
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
};

ToggleButtonCard.displayName = COMPONENT_NAME;
