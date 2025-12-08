import { forwardRef } from 'react';
import { IconProps } from './types';
export const DocumentMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M8 18h8v-2H8zm0-4h8v-2H8zm-4 8V2h10l6 6v14zm9-13h5l-5-5z" />
      </svg>
    );
  }
);
DocumentMediumIcon.displayName = 'DocumentMediumIcon';
