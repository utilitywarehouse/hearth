import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import * as React from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import type { UnstyledIconButtonProps } from '../UnstyledIconButton/UnstyledIconButton.props';

export type AlertIconButtonProps = UnstyledIconButtonProps;

type AlertIconButtonElement = ElementRef<'button'>;

export const AlertIconButton = React.forwardRef<AlertIconButtonElement, AlertIconButtonProps>(
  (props, ref) => {
    const {
      children,
      label = 'Alert action',
      title = 'Alert action',
      className,
      ...buttonProps
    } = props;

    return (
      <UnstyledIconButton
        ref={ref}
        className={clsx(withGlobalPrefix('AlertIconButton'), className)}
        label={label}
        title={title}
        {...buttonProps}
      >
        {children || <ChevronRightSmallIcon />}
      </UnstyledIconButton>
    );
  }
);

AlertIconButton.displayName = 'AlertIconButton';
