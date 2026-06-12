import { forwardRef } from 'react';
import { IconProps } from './types';
export const QuestionMarkSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M9.908 14.424q.46 0 .793-.332.33-.332.331-.795 0-.463-.332-.784a1.1 1.1 0 0 0-.792-.32q-.461 0-.793.32a1.05 1.05 0 0 0-.332.784q0 .463.332.795t.793.332m-.867-2.839h1.733q0-.534.148-.903t.7-.903q.424-.405.691-.868.268-.461.268-1.11 0-1.1-.72-1.681-.718-.58-1.75-.58-1.125 0-1.871.644-.747.645-1.042 1.53l1.622.609q.129-.369.406-.738.276-.369.792-.368.37 0 .572.23a.75.75 0 0 1 .203.507q0 .276-.194.571a2 2 0 0 1-.396.461q-.738.683-.95 1.115-.211.434-.212 1.484M10 18a7.8 7.8 0 0 1-3.133-.628 8.1 8.1 0 0 1-2.533-1.706 8.1 8.1 0 0 1-1.706-2.533A7.8 7.8 0 0 1 2 10q0-1.678.628-3.133a8.1 8.1 0 0 1 1.706-2.533 8.1 8.1 0 0 1 2.533-1.706A7.8 7.8 0 0 1 10 2q1.678 0 3.133.628a8.1 8.1 0 0 1 2.533 1.706 8.1 8.1 0 0 1 1.706 2.533Q18 8.322 18 10t-.628 3.133a8.1 8.1 0 0 1-1.706 2.533 8.1 8.1 0 0 1-2.533 1.706A7.8 7.8 0 0 1 10 18" /></svg>;
});
QuestionMarkSmallIcon.displayName = "QuestionMarkSmallIcon";