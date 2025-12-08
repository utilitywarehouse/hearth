import { forwardRef } from 'react';
import { IconProps } from './types';
export const EmailMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M2 20V4h20v16zm10-7 8-5V6l-8 5-8-5v2z" />
      </svg>
    );
  }
);
EmailMediumIcon.displayName = 'EmailMediumIcon';
