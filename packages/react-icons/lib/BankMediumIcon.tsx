import { forwardRef } from 'react';
import { IconProps } from './types';
export const BankMediumIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', title, titleId, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={22}
        fill="none"
        viewBox="0 0 24 22"
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
          d="M6.21 17.302a1 1 0 0 1-1-1v-5.163a1 1 0 0 1 1-1h.155a1 1 0 0 1 1 1v5.163a1 1 0 0 1-1 1zm5.945 0a1 1 0 0 1-1-1v-5.163a1 1 0 0 1 1-1h.132a1 1 0 0 1 1 1v5.163a1 1 0 0 1-1 1zM2.167 20.57v-2.348h20v2.348zm15.786-3.268a1 1 0 0 1-1-1v-5.163a1 1 0 0 1 1-1h.155a1 1 0 0 1 1 1v5.163a1 1 0 0 1-1 1zM2.167 9.212v-2.43l9.992-5.212 10.008 5.21v2.43z"
        />
      </svg>
    );
  }
);
BankMediumIcon.displayName = 'BankMediumIcon';
