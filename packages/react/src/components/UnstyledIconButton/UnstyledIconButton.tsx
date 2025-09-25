import * as React from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { unstyledIconButtonPropDefs } from './UnstyledIconButton.props';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import { extractProps } from '../../helpers/extract-props';
import { Spinner } from '../Spinner/Spinner';
import { getIconButtonSpinnerSize } from '../../helpers/translate-responsive-button-size';

const COMPONENT_NAME = 'UnstyledIconButton';
const { displayName, componentClassName } = withGlobalPrefix(COMPONENT_NAME);

export type UnstyledIconButtonElement = ElementRef<'button'>;

export const UnstyledIconButton = React.forwardRef<
  UnstyledIconButtonElement,
  UnstyledIconButtonProps
>((props, forwardedRef) => {
  const {
    className,
    children,
    label,
    disabled,
    inverted,
    loading,
    onClick,
    ...unstyledIconButtonProps
  } = extractProps(props, unstyledIconButtonPropDefs);
  const { size } = props;
  const spinnerSize = getIconButtonSpinnerSize(size || 'md');
  return (
    <button
      ref={forwardedRef}
      className={clsx(componentClassName, className)}
      aria-label={label}
      aria-disabled={disabled || loading}
      data-inverted={inverted ? '' : undefined}
      onClick={disabled ? undefined : onClick}
      {...unstyledIconButtonProps}
    >
      {loading ? <Spinner size={spinnerSize} currentColor /> : children}
    </button>
  );
});

UnstyledIconButton.displayName = displayName;
