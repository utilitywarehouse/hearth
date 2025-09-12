import { forwardRef } from 'react';
import { IconProps } from './types';
export const HomeAndBoilerSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M10 1 2 7v12h16V7zm1.87 12.78c-.5.52-1.12.77-1.87.77s-1.37-.25-1.87-.77c-.5-.51-.75-1.16-.75-1.92 0-.55.22-1.13.66-1.78C8.46 9.44 9.12 8.75 10 8c.88.75 1.54 1.44 1.96 2.08.44.65.66 1.23.66 1.78 0 .76-.25 1.41-.75 1.92"
        />
      </svg>
    );
  }
);
HomeAndBoilerSmallIcon.displayName = 'HomeAndBoilerSmallIcon';
