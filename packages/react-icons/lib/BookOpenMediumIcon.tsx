import { forwardRef } from 'react';
import { IconProps } from './types';
export const BookOpenMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M12.91 16.568a10 10 0 0 1 2.01-.716 9.3 9.3 0 0 1 3.682-.102q.785.135 1.58.41v-9a8 8 0 0 0-1.557-.478 8.4 8.4 0 0 0-3.739.113 7.8 7.8 0 0 0-1.977.819zM12 19.25a8.7 8.7 0 0 0-2.364-1.34A7.5 7.5 0 0 0 7 17.431q-1.205 0-2.523.454A8 8 0 0 0 2 19.296V6.114q1-.682 2.352-1.046a9.84 9.84 0 0 1 5.227-.023A9.8 9.8 0 0 1 12 6.068a9.8 9.8 0 0 1 5-1.363q1.296 0 2.648.363 1.351.364 2.352 1.046v13.182a7.7 7.7 0 0 0-2.466-1.41q-1.33-.454-2.534-.454-1.365 0-2.636.477A8.7 8.7 0 0 0 12 19.25m1.818-9.182V8.523a8 8 0 0 1 1.534-.478A8.3 8.3 0 0 1 17 7.886q.59 0 1.16.091.568.09 1.113.228v1.454a6.5 6.5 0 0 0-1.102-.307A6.5 6.5 0 0 0 17 9.25q-.864 0-1.66.216a7.3 7.3 0 0 0-1.522.602m0 5v-1.545a8 8 0 0 1 4.341-.546q.568.09 1.114.228v1.454a6.5 6.5 0 0 0-1.102-.307A6.5 6.5 0 0 0 17 14.25q-.864 0-1.66.205-.795.204-1.522.613m0-2.5v-1.545a8 8 0 0 1 4.341-.546q.568.09 1.114.228v1.454a6.5 6.5 0 0 0-1.102-.307A6.5 6.5 0 0 0 17 11.75q-.864 0-1.66.216a7.3 7.3 0 0 0-1.522.602"
        />
      </svg>
    );
  }
);
BookOpenMediumIcon.displayName = 'BookOpenMediumIcon';
