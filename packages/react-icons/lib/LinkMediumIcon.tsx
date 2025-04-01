import { forwardRef } from 'react';
import { IconProps } from './types';
export const LinkMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.033 17H7.791q-1.999 0-3.395-1.454Q3 14.09 3 12.012t1.396-3.545Q5.791 7 7.791 7h3.242v2.307H7.8q-1.094 0-1.848.78-.753.782-.753 1.917t.753 1.92a2.46 2.46 0 0 0 1.848.784h3.233zm-2.731-4.117v-1.752h7.382v1.752zM12.952 17v-2.292h3.234q1.094 0 1.848-.781.753-.782.753-1.916 0-1.136-.753-1.92a2.46 2.46 0 0 0-1.848-.784h-3.233V7h3.242q1.995 0 3.4 1.465T21 12.01t-1.405 3.535-3.4 1.455z"
        />
      </svg>
    );
  }
);
