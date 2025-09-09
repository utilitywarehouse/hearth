import { forwardRef } from 'react';
import { IconProps } from './types';
export const HomeAndBoilerMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M12 2 3 8.667V22h18V8.667zm2.104 14.2c-.563.578-1.26.856-2.104.856s-1.541-.278-2.104-.856c-.562-.567-.844-1.289-.844-2.133 0-.611.248-1.256.743-1.978.473-.711 1.215-1.478 2.205-2.311.99.833 1.733 1.6 2.205 2.31.495.723.742 1.368.742 1.979 0 .844-.28 1.566-.843 2.133"
        />
      </svg>
    );
  }
);
HomeAndBoilerMediumIcon.displayName = 'HomeAndBoilerMediumIcon';
