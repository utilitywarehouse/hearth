import { forwardRef } from 'react';
import { IconProps } from './types';
export const TransferMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M6.933 21 2 16.119l4.933-4.881 1.723 1.729-1.929 1.918h5.233v2.468H6.728l1.945 1.918zm7.984-3.49q-.577 0-.976-.409-.4-.409-.4-.982 0-.574.4-.983.399-.409.976-.409t.988.41.411.982-.41.982a1.35 1.35 0 0 1-.99.409m4.395 0q-.577 0-.996-.409t-.419-.982.42-.983q.418-.409.995-.409t.976.41q.4.408.4.982t-.4.982a1.3 1.3 0 0 1-.976.409m-2.245-4.732-1.739-1.73 1.929-1.917h-5.218V6.647h5.218L15.328 4.73 17.068 3 22 7.897zm-12.38-3.49q-.576 0-.984-.416a1.35 1.35 0 0 1-.407-.975q0-.59.407-.998.408-.41.985-.409.577 0 .988.409.41.408.41.998 0 .558-.41.975a1.34 1.34 0 0 1-.988.416m4.38 0q-.577 0-.988-.416a1.34 1.34 0 0 1-.411-.975q0-.59.411-.998.41-.41.988-.409.577 0 .984.409.408.408.407.998 0 .558-.407.975t-.984.416"
        />
      </svg>
    );
  }
);
