'use client';

import { Toast as RadixToast } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastTitleProps } from './Toast.props';

const COMPONENT_NAME = 'ToastTitle';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastTitle = ({ className, ...props }: ToastTitleProps) => {
  return <RadixToast.Title className={clsx(componentClassName, className)} {...props} />;
};
ToastTitle.displayName = COMPONENT_NAME;
