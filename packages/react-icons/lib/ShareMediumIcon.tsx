import { forwardRef } from 'react';
import { IconProps } from './types';
export const ShareMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M17.717 22a3.16 3.16 0 0 1-2.32-.963 3.17 3.17 0 0 1-.96-2.321q0-.164.077-.566L8.39 14.545q-.444.379-.97.586-.528.207-1.138.208a3.14 3.14 0 0 1-2.325-.971Q3 13.396 3 12.01q0-1.388.957-2.36a3.14 3.14 0 0 1 2.325-.973q.602 0 1.141.21.54.213.99.584l6.077-3.525a5 5 0 0 1-.038-.312 3 3 0 0 1-.016-.31q0-1.37.963-2.346Q16.362 2 17.72 2t2.32.978.96 2.346a3.2 3.2 0 0 1-.96 2.337 3.16 3.16 0 0 1-2.33.97q-.623 0-1.172-.23a3.8 3.8 0 0 1-.998-.611l-6.046 3.385q.062.2.09.419a3.5 3.5 0 0 1 .003.83 2 2 0 0 1-.085.393l6.023 3.448a3.6 3.6 0 0 1 1.004-.643q.556-.237 1.192-.237 1.377 0 2.328.968.951.967.951 2.35t-.963 2.34a3.17 3.17 0 0 1-2.32.957"
        />
      </svg>
    );
  }
);
ShareMediumIcon.displayName = 'ShareMediumIcon';
