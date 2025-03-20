import * as React from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { unstyledIconButtonPropDefs } from './UnstyledIconButton.props';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import { extractProps } from '../../helpers/extract-props';
import { Spinner } from '../Spinner/Spinner';
import { translateLoadingButtonSize } from '../../helpers/translate-loading-button-size';

const componentName = 'UnstyledIconButton';
const componentClassName = withGlobalPrefix(componentName);

export type UnstyledIconButtonElement = ElementRef<'button'>;

export const UnstyledIconButton = React.forwardRef<
  UnstyledIconButtonElement,
  UnstyledIconButtonProps
>((props, forwardedRef) => {
  const { className, children, label, disabled, loading, ...unstyledIconButtonProps } =
    extractProps(props, unstyledIconButtonPropDefs);
  const { size } = props;
  const spinnerSize = translateLoadingButtonSize(size || 'md');
  return (
    <button
      ref={forwardedRef}
      className={clsx(componentClassName, className)}
      aria-label={label}
      aria-disabled={disabled || loading}
      {...unstyledIconButtonProps}
    >
      {loading ? <Spinner size={spinnerSize} currentColor /> : children}
    </button>
  );
});

UnstyledIconButton.displayName = componentName;
