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
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';

const COMPONENT_NAME = 'IconButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const IconButton = React.forwardRef<ButtonBaseElement, IconButtonProps>(
  (props, forwardedRef) => {
    const { className, label, disabled, loading, children, asChild, ...iconButtonProps } =
      extractProps(props, iconButtonPropDefs);

    const spinnerSize = getResponsiveSizeTranslation(props.size || 'md', { md: 'sm', sm: 'xs' });
    const Component = asChild ? Slot.Root : 'button';

    return (
      <ButtonBase
        ref={forwardedRef}
        className={clsx(componentClassName, className)}
        aria-label={label}
        disabled={disabled || loading}
        asChild
        {...iconButtonProps}
      >
        <Component>
          {loading
            ? getSubtree({ asChild, children }, () => (
                <Spinner size={spinnerSize as SpinnerProps['size']} currentColor />
              ))
            : children}
        </Component>
      </ButtonBase>
    );
  }
);

IconButton.displayName = COMPONENT_NAME;
