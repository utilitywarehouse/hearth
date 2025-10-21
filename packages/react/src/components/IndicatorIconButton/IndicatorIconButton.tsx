import * as React from 'react';

import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import type { IndicatorIconButtonProps } from './IndicatorIconButton.props';

const COMPONENT_NAME = 'IndicatorIconButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type IndicatorIconButtonElement = ElementRef<'button'>;

export const IndicatorIconButton = React.forwardRef<
  IndicatorIconButtonElement,
  IndicatorIconButtonProps
>(({ className, indicator, children, label = 'Action', title = 'Action', ...props }, ref) => {
  return (
    <UnstyledIconButton
      ref={ref}
      className={clsx(componentClassName, className)}
      label={label}
      title={title}
      {...props}
    >
      {children}
      {indicator ? <span className={`${componentClassName}Indicator`} aria-hidden="true" /> : null}
    </UnstyledIconButton>
  );
});

IndicatorIconButton.displayName = COMPONENT_NAME;
