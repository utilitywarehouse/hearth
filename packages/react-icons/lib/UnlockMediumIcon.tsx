import { forwardRef } from 'react';
import { IconProps } from './types';
export const UnlockMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.37 16.377q.683 0 1.166-.457.484-.456.484-1.098 0-.63-.486-1.119a1.6 1.6 0 0 0-1.168-.49q-.682 0-1.166.49t-.483 1.126.486 1.091 1.168.457M4 21V8.576h7.277V7.231q0-1.766 1.27-2.999Q13.817 3 15.647 3q1.824 0 3.088 1.232t1.265 3h-2.23q0-.887-.61-1.491-.609-.605-1.513-.605-.92 0-1.53.604-.61.603-.61 1.494v1.342h5.244V21z"
        />
      </svg>
    );
  }
);
UnlockMediumIcon.displayName = 'UnlockMediumIcon';
