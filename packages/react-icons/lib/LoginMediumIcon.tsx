import { forwardRef } from 'react';
import { IconProps } from './types';
export const LoginMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m16.5 12-5.625 5.625-1.631-1.575 2.925-2.925H3v-2.25h9.169L9.244 7.95l1.631-1.575zm4.5 9h-5.625v-2.25h3.375V5.25h-3.375V3H21z"
        />
      </svg>
    );
  }
);
LoginMediumIcon.displayName = 'LoginMediumIcon';
