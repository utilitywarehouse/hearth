import { forwardRef } from 'react';
import { IconProps } from './types';
export const SettingsSmallIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', title, titleId, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        viewBox="0 0 20 20"
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
          d="m7.811 18-.318-2.56a3 3 0 0 1-.488-.24 7 7 0 0 1-.448-.3l-2.368 1L2 12.1l2.05-1.56a2 2 0 0 1-.02-.27v-.54q0-.13.02-.27L2 7.9l2.189-3.8 2.368 1a5 5 0 0 1 .458-.3 4 4 0 0 1 .478-.24L7.81 2h4.378l.319 2.56q.258.1.487.24.23.14.448.3l2.368-1L18 7.9l-2.05 1.56q.02.14.02.27v.54a1 1 0 0 1-.04.27l2.05 1.56-2.189 3.8-2.348-1a5 5 0 0 1-.458.3 4 4 0 0 1-.477.24L12.189 18zm2.229-5.2q1.155 0 1.97-.82a2.7 2.7 0 0 0 .816-1.98q0-1.16-.816-1.98a2.68 2.68 0 0 0-1.97-.82q-1.174 0-1.98.82A2.72 2.72 0 0 0 7.254 10q0 1.16.806 1.98t1.98.82"
        />
      </svg>
    );
  }
);
SettingsSmallIcon.displayName = 'SettingsSmallIcon';
