import { forwardRef } from 'react';
import { IconProps } from './types';
export const LogoutMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M3 21V3h9.131v2.441H5.426v13.133h6.705V21zm12.847-3.816-1.715-1.708 2.24-2.255H9.057v-2.426h7.285l-2.24-2.256 1.714-1.707L21 12.023z"
        />
      </svg>
    );
  }
);
LogoutMediumIcon.displayName = 'LogoutMediumIcon';
