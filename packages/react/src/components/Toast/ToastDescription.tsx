'use client';

import type { ComponentPropsWithRef } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

export type ToastDescriptionProps = Omit<
  ComponentPropsWithRef<typeof RadixToast.Description>,
  'asChild' | 'dir'
>;

const COMPONENT_NAME = 'ToastDescription';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastDescription = ({ className, ...props }: ToastDescriptionProps) => {
  return <RadixToast.Description className={clsx(componentClassName, className)} {...props} />;
};
ToastDescription.displayName = COMPONENT_NAME;
