import { forwardRef } from 'react';
import { IconProps } from './types';
export const ElectricityMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="m8 22 1-7H4l9-13h2l-1 8h6L10 22z" />
      </svg>
    );
  }
);
ElectricityMediumIcon.displayName = 'ElectricityMediumIcon';
