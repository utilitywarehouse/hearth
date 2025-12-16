'use client';

import * as React from 'react';
import type { FC } from 'react';
import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type ToastDescriptionProps = ComponentPropsWithout<
  typeof RadixToast.Description,
  RemovedProps
>;

const COMPONENT_NAME = 'ToastDescription';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastDescription: FC<ToastDescriptionProps> = ({ className, ...props }) => {
  return <RadixToast.Description className={clsx(componentClassName, className)} {...props} />;
};
ToastDescription.displayName = COMPONENT_NAME;
