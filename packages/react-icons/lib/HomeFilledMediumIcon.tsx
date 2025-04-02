import { forwardRef } from 'react';
import { IconProps } from './types';
export const HomeFilledMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M4 21V9.008L11.992 3 20 9v12h-6.017v-5.237a1.99 1.99 0 0 0-3.981 0V21z"
        />
      </svg>
    );
  }
);
HomeFilledMediumIcon.displayName = 'HomeFilledMediumIcon';
