import { forwardRef } from 'react';
import { IconProps } from './types';
export const HeartOutlineMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m11.977 21-1.531-1.327q-2.506-2.205-4.136-3.81-1.63-1.602-2.589-2.877t-1.34-2.34A6.4 6.4 0 0 1 2 8.465q0-2.335 1.617-3.9Q5.233 3.002 7.625 3a5.7 5.7 0 0 1 2.372.495q1.102.495 1.98 1.462.971-1.013 2.044-1.485A5.7 5.7 0 0 1 16.328 3q2.426 0 4.049 1.565T22 8.465q0 1.11-.377 2.167t-1.34 2.328-2.603 2.887-4.157 3.826zm-.008-3.126a130 130 0 0 0 3.766-3.456q1.47-1.418 2.322-2.474.851-1.058 1.177-1.872a4.3 4.3 0 0 0 .326-1.604q0-1.352-.907-2.233-.906-.88-2.31-.88-1.1 0-2.053.677-.64.455-1.09 1.12c-.279.41-.716.706-1.212.706-.503 0-.945-.306-1.227-.723a4.2 4.2 0 0 0-1.085-1.103q-.972-.678-2.05-.678-1.375 0-2.269.871-.894.872-.894 2.245a4.4 4.4 0 0 0 .337 1.654q.336.836 1.189 1.897.852 1.061 2.3 2.468 1.45 1.405 3.68 3.385" /></svg>;
});
HeartOutlineMediumIcon.displayName = "HeartOutlineMediumIcon";