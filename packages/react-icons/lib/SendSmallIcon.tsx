import { forwardRef } from 'react';
import { IconProps } from './types';
export const SendSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <g clipPath="url(#a)">
          <path
            fill={color}
            d="m10.9 18.655-3.713-3.712L10.9 8.756l-6.187 3.712L1 8.756 17.705 1.95z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill={color} d="M0 0h20v20H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);
SendSmallIcon.displayName = 'SendSmallIcon';
