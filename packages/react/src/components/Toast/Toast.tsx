'use client';

import { Toast as ToastPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ToastProps } from './Toast.props';
import { cn } from '../../helpers/cn';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'Toast';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Toast = ({
  className,
  icon,
  description,
  showDismissButton,
  children,
  ...props
}: ToastProps) => {
  return (
    <ToastPrimitive.Root className={cn(componentClassName, className)} {...props}>
      {icon}
      <ToastPrimitive.Description asChild>
        <div className={`${componentClassName}Description`}>{description}</div>
      </ToastPrimitive.Description>
      {children}
      {showDismissButton ? (
        <ToastPrimitive.Close asChild>
          <UnstyledIconButton label="Dismiss toast" inverted>
            <CloseMediumIcon />
          </UnstyledIconButton>
        </ToastPrimitive.Close>
      ) : null}
    </ToastPrimitive.Root>
  );
};

Toast.displayName = COMPONENT_NAME;
