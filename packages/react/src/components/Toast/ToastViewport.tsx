'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type ToastViewportProps = ComponentPropsWithout<typeof RadixToast.Viewport, RemovedProps>;

const COMPONENT_NAME = 'ToastViewport';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastViewport: FC<ToastViewportProps> = ({ className, ...props }) => {
  return (
    <RadixToast.Viewport
      className={clsx(componentClassName, className)}
      {...props}
    />
  );
};
ToastViewport.displayName = COMPONENT_NAME;

