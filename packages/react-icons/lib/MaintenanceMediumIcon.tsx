import { forwardRef } from 'react';
import { IconProps } from './types';
export const MaintenanceMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path
          fill={color}
          d="m17.15 20.7-6.05-6.1q-.5.2-1.012.3A5.7 5.7 0 0 1 9 15q-2.5 0-4.25-1.75T3 9q0-.9.25-1.713.25-.812.7-1.537L7.6 9.4l1.8-1.8-3.65-3.65q.725-.45 1.537-.7A5.8 5.8 0 0 1 9 3q2.5 0 4.25 1.75T15 9q0 .575-.1 1.088-.1.512-.3 1.012l6.1 6.05q.3.3.3.725t-.3.725l-2.1 2.1q-.3.3-.725.3a1 1 0 0 1-.725-.3"
        />
      </svg>
    );
  }
);
MaintenanceMediumIcon.displayName = 'MaintenanceMediumIcon';
