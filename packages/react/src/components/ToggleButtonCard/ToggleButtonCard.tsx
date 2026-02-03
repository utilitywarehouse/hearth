'use client';

import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToggleButtonCardProps } from './ToggleButtonCard.props';
import { Card } from '../Card/Card';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { extractProps } from '../../helpers/extract-props';

const COMPONENT_NAME = 'ToggleButtonCard';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToggleButtonCard = (props: ToggleButtonCardProps) => {
  const {
    className,
    style,
    children,
    label,
    alignItems,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...toggleButtonCardProps
  } = extractProps(props, flexItemPropDefs);
  return (
    <Card
      direction="column"
      alignItems={alignItems}
      className={cn(componentClassName, className)}
      style={style}
    >
      {children}
      <RadixToggleGroup.Item
        {...toggleButtonCardProps}
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
