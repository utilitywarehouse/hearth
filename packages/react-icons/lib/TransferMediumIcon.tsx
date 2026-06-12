import { forwardRef } from 'react';
import { IconProps } from './types';
export const TransferMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m7 21-5-5 5-5 1.425 1.4-2.6 2.6H21v2H5.825l2.6 2.6zm10-8-1.425-1.4 2.6-2.6H3V7h15.175l-2.6-2.6L17 3l5 5z"
        />
      </svg>
    );
  }
);
TransferMediumIcon.displayName = 'TransferMediumIcon';
