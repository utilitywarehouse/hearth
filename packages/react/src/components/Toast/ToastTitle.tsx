'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type ToastTitleProps = ComponentPropsWithout<typeof RadixToast.Title, RemovedProps>;

const COMPONENT_NAME = 'ToastTitle';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastTitle: FC<ToastTitleProps> = ({ className, ...props }) => {
  return (
    <RadixToast.Title className={clsx(componentClassName, className)} {...props} />
  );
};
ToastTitle.displayName = COMPONENT_NAME;

