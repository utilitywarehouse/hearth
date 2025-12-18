'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

export type ToastDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixToast.Description>,
  'asChild' | 'dir'
>;

const COMPONENT_NAME = 'ToastDescription';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastDescription: FC<ToastDescriptionProps> = ({ className, ...props }) => {
  return <RadixToast.Description className={clsx(componentClassName, className)} {...props} />;
};
ToastDescription.displayName = COMPONENT_NAME;
