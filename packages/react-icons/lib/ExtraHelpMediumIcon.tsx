import { forwardRef } from 'react';
import { IconProps } from './types';
export const ExtraHelpMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M12.023 22v-1.969h6.536V18.94h-3.832v-7.582h3.832v-.737q0-2.596-1.908-4.443-1.908-1.848-4.636-1.847-2.68 0-4.635 1.847T5.426 10.62v.737h3.831v7.582H3v-8.316q0-1.773.715-3.34a8.9 8.9 0 0 1 1.938-2.746A9.1 9.1 0 0 1 8.521 2.68 9.1 9.1 0 0 1 12.026 2a9.1 9.1 0 0 1 3.493.675 9.1 9.1 0 0 1 2.856 1.846 8.7 8.7 0 0 1 1.924 2.738A8.1 8.1 0 0 1 21 10.62V22z"
        />
      </svg>
    );
  }
);
ExtraHelpMediumIcon.displayName = 'ExtraHelpMediumIcon';
