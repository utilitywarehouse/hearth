'use client';

import { Toast as ToastPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastDescriptionProps } from './Toast.props';
import { cn } from '../../helpers/cn';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ToastDescription';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastDescription = ({ className, children, ...props }: ToastDescriptionProps) => {
  return (
    <ToastPrimitive.Description className={cn(componentClassName, className)} {...props} asChild>
      <BodyText size="md" color="inverted">
        {children}
      </BodyText>
    </ToastPrimitive.Description>
  );
};
ToastDescription.displayName = COMPONENT_NAME;
