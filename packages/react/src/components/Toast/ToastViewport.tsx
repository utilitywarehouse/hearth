'use client';

import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastViewportProps } from './Toast.props';

const COMPONENT_NAME = 'ToastViewport';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastViewport = ({ className, ...props }: ToastViewportProps) => {
  return <RadixToast.Viewport className={clsx(componentClassName, className)} {...props} />;
};
ToastViewport.displayName = COMPONENT_NAME;
