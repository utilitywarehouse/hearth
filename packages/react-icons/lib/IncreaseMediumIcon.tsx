import { forwardRef } from 'react';
import { IconProps } from './types';
export const IncreaseMediumIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', title, titleId, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden={!title}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path fill={color} d="M13.25 6.781V22h-2.5V6.781l-7 7L2 12 12 2l10 10-1.75 1.781z" />
      </svg>
    );
  }
);
IncreaseMediumIcon.displayName = 'IncreaseMediumIcon';
