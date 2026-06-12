import { forwardRef } from 'react';
import { IconProps } from './types';
export const QuestionMarkMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M11.875 18q.625 0 1.075-.45t.45-1.079-.45-1.062-1.075-.434-1.075.434-.45 1.062q0 .63.45 1.079.45.45 1.075.45M10.7 14.15h2.35q0-.725.2-1.225t.95-1.225q.575-.55.938-1.177.362-.626.362-1.505 0-1.494-.975-2.28-.975-.789-2.375-.788-1.525 0-2.538.875T8.2 8.9l2.2.825q.175-.5.55-1t1.075-.5q.5 0 .775.312.275.313.275.688t-.262.775a2.8 2.8 0 0 1-.538.625q-1 .925-1.287 1.512-.288.588-.288 2.013m1.3 8.7q-2.275 0-4.25-.852a10.9 10.9 0 0 1-3.435-2.313 10.9 10.9 0 0 1-2.313-3.435Q1.15 14.275 1.15 12t.852-4.25a10.9 10.9 0 0 1 2.313-3.435A10.9 10.9 0 0 1 7.75 2.002Q9.725 1.15 12 1.15t4.25.852a10.9 10.9 0 0 1 3.435 2.313 10.9 10.9 0 0 1 2.313 3.435q.852 1.975.852 4.25t-.852 4.25a10.9 10.9 0 0 1-2.313 3.435 10.9 10.9 0 0 1-3.435 2.313q-1.975.852-4.25.852" /></svg>;
});
QuestionMarkMediumIcon.displayName = "QuestionMarkMediumIcon";