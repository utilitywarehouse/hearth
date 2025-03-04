import * as React from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { ButtonBase, ButtonBaseElement } from '../ButtonBase/ButtonBase';
import { buttonPropDefs, ButtonProps } from './Button.props';

const componentName = 'Button';
const componentClassName = withGlobalPrefix(componentName);

export const Button = React.forwardRef<ButtonBaseElement, ButtonProps>((props, forwardedRef) => {
  const { className, ...buttonProps } = extractProps(props, buttonPropDefs);
  return (
    <ButtonBase
      ref={forwardedRef}
      className={clsx(componentClassName, className)}
      {...buttonProps}
    />
  );
});

Button.displayName = componentName;
