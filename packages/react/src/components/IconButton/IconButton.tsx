import * as React from 'react';

import clsx from 'clsx';
import { iconButtonPropDefs, IconButtonProps } from './IconButton.props';
import { ButtonBase } from '../ButtonBase/ButtonBase';
import type { ButtonBaseElement } from '../ButtonBase/ButtonBase';
import { extractProps } from '../../helpers/extract-props';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import { Spinner } from '../Spinner/Spinner';
import { translateResponsiveButtonSize } from '../../helpers/translate-responsive-button-size';

const componentName = 'IconButton';
const componentClassName = withClassnameGlobalPrefix(componentName);

export const IconButton = React.forwardRef<ButtonBaseElement, IconButtonProps>(
  (props, forwardedRef) => {
    const { className, label, disabled, loading, children, ...iconButtonProps } = extractProps(
      props,
      iconButtonPropDefs
    );
    const { size } = props;
    const spinnerSize = translateResponsiveButtonSize(size || 'md');
    return (
      <ButtonBase
        ref={forwardedRef}
        className={clsx(componentClassName, className)}
        aria-label={label}
        disabled={disabled || loading}
        {...iconButtonProps}
      >
        {loading ? <Spinner size={spinnerSize} currentColor /> : children}
      </ButtonBase>
    );
  }
);

IconButton.displayName = componentName;
