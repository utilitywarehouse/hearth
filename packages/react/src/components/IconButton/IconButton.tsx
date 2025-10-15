import * as React from 'react';

import clsx from 'clsx';
import { iconButtonPropDefs, IconButtonProps } from './IconButton.props';
import { ButtonBase } from '../ButtonBase/ButtonBase';
import type { ButtonBaseElement } from '../ButtonBase/ButtonBase';
import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Spinner } from '../Spinner/Spinner';
import { getResponsiveSizeTranslation } from '../../helpers/get-responsive-size-translation';
import type { SpinnerProps } from '../Spinner/Spinner.props';

const COMPONENT_NAME = 'IconButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const IconButton = React.forwardRef<ButtonBaseElement, IconButtonProps>(
  (props, forwardedRef) => {
    const { className, label, disabled, loading, children, ...iconButtonProps } = extractProps(
      props,
      iconButtonPropDefs
    );

    const spinnerSize = getResponsiveSizeTranslation(props.size || 'md', { md: 'sm', sm: 'xs' });

    return (
      <ButtonBase
        ref={forwardedRef}
        className={clsx(componentClassName, className)}
        aria-label={label}
        disabled={disabled || loading}
        {...iconButtonProps}
      >
        {loading ? <Spinner size={spinnerSize as SpinnerProps['size']} currentColor /> : children}
      </ButtonBase>
    );
  }
);

IconButton.displayName = COMPONENT_NAME;
