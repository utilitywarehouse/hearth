import * as React from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { ButtonBase, ButtonBaseElement } from '../ButtonBase/ButtonBase';
import { buttonPropDefs, ButtonProps } from './Button.props';
import { Spinner } from '../Spinner/Spinner';

const componentName = 'Button';
const componentClassName = withGlobalPrefix(componentName);

export const Button = React.forwardRef<ButtonBaseElement, ButtonProps>((props, forwardedRef) => {
  const { className, children, disabled, loading, ...buttonProps } = extractProps(
    props,
    buttonPropDefs
  );
  return (
    <ButtonBase
      ref={forwardedRef}
      className={clsx(componentClassName, className)}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading ? (
        <div className="hearth-loading">
          <div>
            <Spinner size="xs" currentColor />
          </div>
          <span className="hearth-hidden">{children}</span>
        </div>
      ) : (
        children
      )}
    </ButtonBase>
  );
});

Button.displayName = componentName;
