import { forwardRef } from 'react';
import { IconProps } from './types';
export const FilterSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M9.111 18v-5.333h1.778v1.777H18v1.778h-7.111V18zM2 16.222v-1.778h5.333v1.778zm3.556-3.555v-1.778H2V9.11h3.556V7.333h1.777v5.334zm3.555-1.778V9.11H18v1.778zm3.556-3.556V2h1.777v1.778H18v1.778h-3.556v1.777zM2 5.556V3.778h8.889v1.778z"
        />
      </svg>
    );
  }
);
FilterSmallIcon.displayName = 'FilterSmallIcon';
