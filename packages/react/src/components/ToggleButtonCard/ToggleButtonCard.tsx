'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToggleButtonCardProps } from './ToggleButtonCard.props';
import { Card } from '../Card/Card';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { extractProps } from '../../helpers/extract-props';
import { flexPropDefs } from '../Flex/Flex.props';
import { alignItemsPropDefs } from '../../props/align-items.props';
import { alignContentPropDefs } from '../../props/align-content.props';
import { justifyContentPropDefs } from '../../props/justify-content.props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'ToggleButtonCard';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ToggleButtonCardElement = ComponentRef<'button'>;

export const ToggleButtonCard = forwardRef<ToggleButtonCardElement, ToggleButtonCardProps>(
  (props, ref) => {
    const {
      className,
      style,
      children,
      label,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...toggleButtonCardProps
    } = extractProps(
      props,
      flexItemPropDefs,
      flexPropDefs,
      alignItemsPropDefs,
      alignContentPropDefs,
      justifyContentPropDefs,
      marginPropDefs
    );
    return (
      <Card
        direction="column"
        className={cn(componentClassName, className)}
        data-testid={componentClassName}
        style={style}
      >
        {children}
        <ToggleButton
          ref={ref}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          {...toggleButtonCardProps}
        >
          {label}
        </ToggleButton>
      </Card>
    );
  }
);

ToggleButtonCard.displayName = COMPONENT_NAME;
