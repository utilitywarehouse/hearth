import { forwardRef } from 'react';
import { IconProps } from './types';
export const GasMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M18.01 8.36C16.69 6.4 14.68 4.28 12 2 9.32 4.28 7.31 6.4 5.99 8.36 4.66 10.32 4 12.13 4 13.8c0 2.33.76 4.28 2.29 5.85C7.81 21.22 9.72 22 12 22s4.19-.78 5.71-2.35C19.24 18.08 20 16.13 20 13.8c0-1.67-.66-3.48-1.99-5.44M14 19.18c-.53.55-1.2.82-2 .82s-1.47-.27-2-.82-.8-1.23-.8-2.05c0-.58.23-1.22.7-1.9.46-.69 1.16-1.43 2.1-2.23.94.8 1.64 1.54 2.1 2.23.47.68.7 1.32.7 1.9 0 .82-.27 1.5-.8 2.05"
        />
      </svg>
    );
  }
);
GasMediumIcon.displayName = 'GasMediumIcon';
