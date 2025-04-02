import { forwardRef } from 'react';
import { IconProps } from './types';
export const DecreaseSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="m10 13.5-7-7h14z" />
      </svg>
    );
  }
);
DecreaseSmallIcon.displayName = 'DecreaseSmallIcon';
