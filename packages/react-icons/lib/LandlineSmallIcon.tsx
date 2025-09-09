import { forwardRef } from 'react';
import { IconProps } from './types';
export const LandlineSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M6.95 7V4.433c.255-.072.5-.145.762-.193a10.6 10.6 0 0 1 2.284-.241 10.6 10.6 0 0 1 3.045.434v2.569l3.053 2.246L19 6.39A12.3 12.3 0 0 0 9.996 2.5C6.436 2.5 3.243 4.006 1 6.397l2.906 2.858L6.959 7.01z"
        />
        <path
          fill={color}
          d="m16.102 11.131-4.575-3.373V5.624a9.6 9.6 0 0 0-3.045 0v2.134L3.906 11.13 2.383 17.5h15.242zm-6.098 4.292c-1.35 0-2.456-1.087-2.456-2.416s1.105-2.415 2.456-2.415 2.456 1.087 2.456 2.415-1.105 2.416-2.456 2.416"
        />
      </svg>
    );
  }
);
LandlineSmallIcon.displayName = 'LandlineSmallIcon';
