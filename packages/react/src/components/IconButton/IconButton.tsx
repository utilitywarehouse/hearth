'use client';

import { cn } from '../../helpers/cn';
import { iconButtonPropDefs } from './IconButton.props';
import type { IconButtonProps } from './IconButton.props';
import { ButtonBase } from '../ButtonBase/ButtonBase';
import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Spinner } from '../Spinner/Spinner';
import type { SpinnerProps } from '../Spinner/Spinner.props';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';
import { getResponsiveTranslation } from '../../helpers/get-responsive-translation';

const COMPONENT_NAME = 'IconButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const IconButton = (props: IconButtonProps) => {
  const { className, label, disabled, loading, children, asChild, ...iconButtonProps } =
    extractProps(props, iconButtonPropDefs);

  const spinnerSize = getResponsiveTranslation(props.size || 'md', { md: 'sm', sm: 'xs' });
  const Component = asChild ? Slot.Root : 'button';

  return (
    <ButtonBase
      className={cn(componentClassName, className)}
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
};

IconButton.displayName = COMPONENT_NAME;
