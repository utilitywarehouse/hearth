import { forwardRef } from 'react';
import { IconProps } from './types';
export const UnlockSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M3.5 18.5V7.167h8.938v-1.62q0-1.01-.711-1.72A2.36 2.36 0 0 0 10 3.12q-1.016 0-1.727.708a2.34 2.34 0 0 0-.71 1.72H5.938q0-1.68 1.188-2.863T10 1.5t2.874 1.184 1.188 2.864v1.619H16.5V18.5zm6.5-4.048q.67 0 1.148-.475t.477-1.144-.477-1.143A1.57 1.57 0 0 0 10 11.214q-.67 0-1.148.476a1.56 1.56 0 0 0-.477 1.143q0 .669.477 1.144.478.475 1.148.475"
        />
      </svg>
    );
  }
);
UnlockSmallIcon.displayName = 'UnlockSmallIcon';
