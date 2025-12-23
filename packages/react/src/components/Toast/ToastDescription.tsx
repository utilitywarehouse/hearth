'use client';

import { Toast as RadixToast } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastDescriptionProps } from './Toast.props';
import { cn } from '../../helpers/cn';

const COMPONENT_NAME = 'ToastDescription';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastDescription = ({ className, ...props }: ToastDescriptionProps) => {
  return <RadixToast.Description className={cn(componentClassName, className)} {...props} />;
};
ToastDescription.displayName = COMPONENT_NAME;
