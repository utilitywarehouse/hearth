'use client';

import { Toast as RadixToast } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastCloseProps } from './Toast.props';
import { cn } from '../../helpers/cn';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';

const COMPONENT_NAME = 'ToastClose';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ToastClose = ({ className, ...props }: ToastCloseProps) => {
  return (
    <RadixToast.Close className={cn(componentClassName, className)} asChild {...props}>
      <UnstyledIconButton label="close toast" inverted>
        <CloseMediumIcon />
      </UnstyledIconButton>
    </RadixToast.Close>
  );
};
ToastClose.displayName = COMPONENT_NAME;
