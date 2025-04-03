import { forwardRef } from 'react';
import { IconProps } from './types';
export const AddMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M10.72 21v-7.72H3v-2.55h7.72V3h2.55v7.73H21v2.55h-7.73V21z" />
      </svg>
    );
  }
);
AddMediumIcon.displayName = 'AddMediumIcon';
