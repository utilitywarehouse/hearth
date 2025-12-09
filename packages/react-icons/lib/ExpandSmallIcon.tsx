import { forwardRef } from 'react';
import { IconProps } from './types';
export const ExpandSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path
          fill={color}
          d="m10 18-5-5.229 1.352-1.414L10 15.173l3.648-3.816L15 12.771zM6.352 8.643 5 7.229 10 2l5 5.229-1.352 1.414L10 4.827z"
        />
      </svg>
    );
  }
);
ExpandSmallIcon.displayName = 'ExpandSmallIcon';
