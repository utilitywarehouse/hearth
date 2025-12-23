'use client';

import { Toast as RadixToast } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastActionProps } from './Toast.props';
import { cn } from '../../helpers/cn';

const COMPONENT_NAME = 'ToastAction';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastAction = ({ className, ...props }: ToastActionProps) => {
  return <RadixToast.Action className={cn(componentClassName, className)} asChild {...props} />;
};
ToastAction.displayName = COMPONENT_NAME;
