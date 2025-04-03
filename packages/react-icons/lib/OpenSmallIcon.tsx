import { forwardRef } from 'react';
import { IconProps } from './types';
export const OpenSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M2.35 17.15V2.35h7.4v2.04H4.391v10.72H15.11V9.75h2.041v7.4zm5.828-4.4L6.75 11.322l6.931-6.93H11.75V2.35h5.4v5.4h-2.04V5.819z"
        />
      </svg>
    );
  }
);
OpenSmallIcon.displayName = 'OpenSmallIcon';
