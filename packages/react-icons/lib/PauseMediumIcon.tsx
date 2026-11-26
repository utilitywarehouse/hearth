import { forwardRef } from 'react';
import { IconProps } from './types';
export const PauseMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M14.5 20.5v-17h5v17zm-10 0v-17h5v17z" />
      </svg>
    );
  }
);
PauseMediumIcon.displayName = 'PauseMediumIcon';
