'use client';

import type { ComponentPropsWithRef } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

export type ToastViewportProps = Omit<
  ComponentPropsWithRef<typeof RadixToast.Viewport>,
  'asChild' | 'dir'
>;

const COMPONENT_NAME = 'ToastViewport';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastViewport = ({ className, ...props }: ToastViewportProps) => {
  return <RadixToast.Viewport className={clsx(componentClassName, className)} {...props} />;
};
ToastViewport.displayName = COMPONENT_NAME;
