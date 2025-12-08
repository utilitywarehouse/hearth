import { forwardRef } from 'react';
import { IconProps } from './types';
export const WithdrawMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M19 20.5h2v-18H3v10h2v-8h14v14h-8v2zm-14 2 1.4-1.4-1.575-1.6H9v-2H4.825L6.4 15.9 5 14.5l-4 4zm2-10v-2h10v2z"
        />
      </svg>
    );
  }
);
WithdrawMediumIcon.displayName = 'WithdrawMediumIcon';
