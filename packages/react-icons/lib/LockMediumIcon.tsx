import { forwardRef } from 'react';
import { IconProps } from './types';
export const LockMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M4.5 21V8.576h3.065V7.231q0-1.766 1.286-2.999Q10.137 3 11.991 3t3.142 1.232 1.288 3v1.344H19.5V21zm7.495-4.623a1.68 1.68 0 0 0 1.186-.457q.49-.456.491-1.098 0-.63-.494-1.119a1.63 1.63 0 0 0-1.188-.49q-.693 0-1.185.49t-.492 1.126.494 1.091q.495.457 1.188.457m-2.177-7.8h4.35V7.233q0-.89-.623-1.494-.624-.604-1.547-.604-.924 0-1.552.604a2 2 0 0 0-.628 1.494z"
        />
      </svg>
    );
  }
);
