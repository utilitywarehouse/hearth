import { forwardRef } from 'react';
import { IconProps } from './types';
export const ShoppingMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M4 21.5V7.024h3.556q0-1.878 1.3-3.2Q10.155 2.5 12 2.5t3.144 1.323q1.3 1.324 1.3 3.2H20V21.5zm8-7.238q1.845 0 3.144-1.323.983-1 1.223-2.317c.088-.482-.32-.884-.811-.884s-.87.408-1.022.875q-.187.583-.645 1.048a2.55 2.55 0 0 1-1.889.791q-1.11 0-1.889-.791-.457-.466-.645-1.048c-.152-.467-.53-.875-1.022-.875-.49 0-.899.402-.81.884q.24 1.317 1.222 2.317 1.299 1.323 3.144 1.323M9.333 7.024h5.334q0-1.131-.778-1.923A2.55 2.55 0 0 0 12 4.31q-1.11 0-1.889.791a2.64 2.64 0 0 0-.778 1.923"
        />
      </svg>
    );
  }
);
ShoppingMediumIcon.displayName = 'ShoppingMediumIcon';
