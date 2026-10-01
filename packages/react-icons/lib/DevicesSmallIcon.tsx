import { forwardRef } from 'react';
import { IconProps } from './types';
export const DevicesSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M3.333 5h15V3.333h-15c-.916 0-1.666.75-1.666 1.667v9.167H0v2.5h11.667v-2.5H3.333zm15.834 1.667h-5a.836.836 0 0 0-.834.833v8.333c0 .459.375.834.834.834h5a.836.836 0 0 0 .833-.834V7.5a.836.836 0 0 0-.833-.833m-.834 7.5H15V8.333h3.333z"
        />
      </svg>
    );
  }
);
DevicesSmallIcon.displayName = 'DevicesSmallIcon';
