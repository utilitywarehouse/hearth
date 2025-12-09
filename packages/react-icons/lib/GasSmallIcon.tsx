import { forwardRef } from 'react';
import { IconProps } from './types';
export const GasSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M14.883 7.088C13.811 5.52 12.178 3.824 10 2 7.823 3.824 6.19 5.52 5.117 7.088 4.037 8.656 3.5 10.104 3.5 11.44c0 1.864.617 3.424 1.86 4.68C6.597 17.376 8.149 18 10 18s3.404-.624 4.64-1.88q1.862-1.884 1.86-4.68c0-1.336-.536-2.784-1.617-4.352m-3.258 8.656c-.43.44-.975.656-1.625.656q-.977.002-1.625-.656c-.43-.44-.65-.984-.65-1.64 0-.464.187-.976.569-1.52q.56-.826 1.706-1.784c.764.64 1.332 1.232 1.706 1.784.382.544.569 1.056.569 1.52 0 .656-.22 1.2-.65 1.64"
        />
      </svg>
    );
  }
);
GasSmallIcon.displayName = 'GasSmallIcon';
