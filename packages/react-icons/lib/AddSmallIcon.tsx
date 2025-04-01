import { forwardRef } from 'react';
import { IconProps } from './types';
export const AddSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M9.066 11.138H3V8.862h6.066V2.797h2.275v6.066h6.066v2.274H11.34v6.066H9.066z"
        />
      </svg>
    );
  }
);
