import { forwardRef } from 'react';
import { IconProps } from './types';
export const DecreaseMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M10.75 17.219V2h2.5v15.219l7-7L22 12 12 22 2 12l1.75-1.781z" />
      </svg>
    );
  }
);
DecreaseMediumIcon.displayName = 'DecreaseMediumIcon';
