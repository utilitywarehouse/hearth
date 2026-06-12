import { forwardRef } from 'react';
import { IconProps } from './types';
export const ElectricitySmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="m6.75 18 .813-5.6H3.5L10.813 2h1.624l-.812 6.4H16.5L8.375 18z" />
      </svg>
    );
  }
);
ElectricitySmallIcon.displayName = 'ElectricitySmallIcon';
