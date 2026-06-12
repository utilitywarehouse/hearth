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
          d="m7.5 12 5.625-5.625 1.631 1.575-2.925 2.925H21v2.25h-9.169l2.925 2.925-1.631 1.575zM3 3h5.625v2.25H5.25v13.5h3.375V21H3z"
        />
      </svg>
    );
  }
);
LogoutMediumIcon.displayName = 'LogoutMediumIcon';
