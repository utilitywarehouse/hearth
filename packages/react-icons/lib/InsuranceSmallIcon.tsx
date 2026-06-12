import { forwardRef } from 'react';
import { IconProps } from './types';
export const InsuranceSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M18 10c0-4.4-3.6-8-8-8s-8 3.6-8 8h7.2v5.6c0 .48-.32.8-.8.8s-.8-.32-.8-.8v-.8H6v.8C6 16.96 7.04 18 8.4 18s2.4-1.04 2.4-2.4V10z"
        />
      </svg>
    );
  }
);
InsuranceSmallIcon.displayName = 'InsuranceSmallIcon';
