import { forwardRef } from 'react';
import { IconProps } from './types';
export const HeadsetOffMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m21.62 17.665-2.58-2.525v-1.294h-1.323l-2.58-2.524h3.903v-.805q0-2.715-1.94-4.604-1.942-1.89-4.706-1.889-1.048 0-1.934.278a7 7 0 0 0-1.675.785L6.933 3.295q1.053-.832 2.463-1.314a9.2 9.2 0 0 1 2.993-.481 9.2 9.2 0 0 1 3.578.701 9.3 9.3 0 0 1 2.935 1.929 9.2 9.2 0 0 1 1.988 2.868 8.55 8.55 0 0 1 .73 3.52zM12.39 22.5v-2.255h6.37l-.726-.683h-2.971v-2.826l-8.84-8.649a8 8 0 0 0-.352 1.227 6 6 0 0 0-.132 1.2v.808h3.977v8.24H5.739q-1.08 0-1.83-.735a2.4 2.4 0 0 1-.75-1.79v-6.52q0-1.126.31-2.32.31-1.196.839-2.1L1.5 3.386l1.374-1.348L22.5 21.25v1.25zm-6.651-5.463h1.397v-3.19H5.739z"
        />
      </svg>
    );
  }
);
HeadsetOffMediumIcon.displayName = 'HeadsetOffMediumIcon';
