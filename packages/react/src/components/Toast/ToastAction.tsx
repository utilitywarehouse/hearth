'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

export type ToastActionProps = Omit<RadixToast.ToastActionProps, 'asChild'>;

const COMPONENT_NAME = 'ToastAction';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastAction: FC<ToastActionProps> = ({ className, ...props }) => {
  return <RadixToast.Action className={clsx(componentClassName, className)} asChild {...props} />;
};
ToastAction.displayName = COMPONENT_NAME;
