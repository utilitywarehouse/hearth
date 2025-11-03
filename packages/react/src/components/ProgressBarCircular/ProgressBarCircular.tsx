import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { ProgressBarCircularProps } from './ProgressBarCircular.props';
import './ProgressBarCircular.css';

const COMPONENT_NAME = 'ProgressBarCircular';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressBarCircularElement = ElementRef<'div'>;

const PROGRESS_BAR_DIMENSIONS = {
  viewBoxSize: {
    sm: 80,
    md: 140,
  },
  strokeWidth: {
    sm: 8,
    md: 12,
  },
};

export const ProgressBarCircular = React.forwardRef<
  ProgressBarCircularElement,
  ProgressBarCircularProps
>((props, ref) => {
  const {
    className,
    children,
    type = 'default',
    value,
    size = 'md',
    'aria-label': ariaLabel,
    ...restProps
  } = extractProps(props, marginPropDefs);
  // Override value to 100 for success type (always show full bar)
  const effectiveValue = type === 'success' ? 100 : value;

  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(effectiveValue, 0), 100);

  // SVG circle parameters - radius depends on size for circumference calculation
  const viewBoxSize = PROGRESS_BAR_DIMENSIONS.viewBoxSize[size];
  const strokeWidth = PROGRESS_BAR_DIMENSIONS.strokeWidth[size];
  const radius = (viewBoxSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  // For sm size show only ProgressBarValue if present
  const childrenArray = React.Children.toArray(children);
  let displayContent = children;

  if (size === 'sm' && childrenArray.length > 0) {
    const valueChild = childrenArray.find(
      child =>
        React.isValidElement(child) &&
        typeof child.type !== 'string' &&
        'displayName' in child.type &&
        child.type.displayName === 'ProgressBarValue'
    );

    // Only show the value child for small size
    displayContent = valueChild || null;
  }

  return (
    <div
      ref={ref}
      className={clsx(componentClassName, className)}
      data-type={type}
      data-size={size}
      role="group"
      aria-label={ariaLabel || 'Progress indicator'}
      {...restProps}
    >
      <svg
        className={`${componentClassName}Svg`}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        role="img"
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle className={`${componentClassName}Circle ${componentClassName}CircleBackground`} />
        {/* Progress circle */}
        <circle
          className={`${componentClassName}Circle ${componentClassName}CircleProgress`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${clampedValue}% complete`}
        />
      </svg>
      <div className={`${componentClassName}Content`}>{displayContent}</div>
    </div>
  );
});

ProgressBarCircular.displayName = COMPONENT_NAME;
