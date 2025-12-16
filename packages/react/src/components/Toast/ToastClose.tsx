'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

export type ToastCloseProps = Omit<RadixToast.ToastCloseProps, 'asChild'>;

const COMPONENT_NAME = 'ToastClose';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastClose: FC<ToastCloseProps> = ({ className, ...props }) => {
  return <RadixToast.Close className={clsx(componentClassName, className)} asChild {...props} />;
};
ToastClose.displayName = COMPONENT_NAME;
