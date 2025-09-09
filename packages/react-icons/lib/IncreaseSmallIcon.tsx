import { forwardRef } from 'react';
import { IconProps } from './types';
export const IncreaseSmallIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', title, titleId, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        viewBox="0 0 20 20"
        aria-hidden={!title}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path fill={color} d="M11 5.825V18H9V5.825l-5.6 5.6L2 10l8-8 8 8-1.4 1.425z" />
      </svg>
    );
  }
);
IncreaseSmallIcon.displayName = 'IncreaseSmallIcon';
