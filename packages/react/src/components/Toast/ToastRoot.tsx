'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

export type ToastProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixToast.Root>,
  'asChild' | 'dir'
>;

const COMPONENT_NAME = 'Toast';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Toast: FC<ToastProps> = ({ className, ...props }) => {
  return <RadixToast.Root className={clsx(componentClassName, className)} {...props} />;
};
Toast.displayName = COMPONENT_NAME;
