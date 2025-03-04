import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import clsx from 'clsx';
import { buttonBasePropDefs, ButtonBaseProps } from './ButtonBase.props';
import { DATA_ATTRIBUTES } from '../../helpers/data-attributes';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';

const componentName = 'ButtonBase';
const componentClassName = withGlobalPrefix(componentName);

export type ButtonBaseElement = ElementRef<'button'>;

export const ButtonBase = React.forwardRef<ButtonBaseElement, ButtonBaseProps>((props, ref) => {
  const { colorScheme, className, disabled, onClick, asChild, children, ...buttonBaseProps } =
    extractProps(props, buttonBasePropDefs);
  const { variant = 'solid' } = props;

  const defaultColorScheme = variant === 'emphasis' || variant === 'solid' ? 'yellow' : 'grey';
  const dataAttributeProps = { [DATA_ATTRIBUTES.colorscheme]: colorScheme || defaultColorScheme };

  const Component = asChild ? Slot : 'button';

  // We're rendering a different component here so that we don't have to apply
  // transitions to box-shadow, which causes re-paints on every frame, heavily
  // impacting performance.
  if (variant === 'emphasis') {
    return (
      <Component
        ref={ref}
        aria-disabled={disabled || undefined}
        className={clsx(componentClassName, className)}
        // as we're using aria-disabled instead of disabled then we need to
        // disable the onClick event
        onClick={disabled ? undefined : onClick}
        {...dataAttributeProps}
        {...buttonBaseProps}
      >
        <span className="hearth-shadow"></span>
        <span className="hearth-front">{children}</span>
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      aria-disabled={disabled || undefined}
      className={clsx(componentClassName, className)}
      // as we're using aria-disabled instead of disabled then we need to
      // disable the onClick event
      onClick={disabled ? undefined : onClick}
      {...dataAttributeProps}
      {...buttonBaseProps}
    >
      {children}
    </Component>
  );
});

ButtonBase.displayName = componentName;
