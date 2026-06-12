import { forwardRef } from 'react';
import { IconProps } from './types';
export const EditMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M4.915 19.088h1.364l9.36-9.347-1.365-1.363-9.36 9.347zM3 21v-4.064L17.003 3 21 7.088 7.07 21zM14.944 9.072l-.67-.694 1.364 1.363z"
        />
      </svg>
    );
  }
);
EditMediumIcon.displayName = 'EditMediumIcon';
