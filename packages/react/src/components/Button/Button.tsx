'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { ButtonBase } from '../ButtonBase/ButtonBase';
import { buttonPropDefs } from './Button.props';
import type { ButtonProps } from './Button.props';
import { Spinner } from '../Spinner/Spinner';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';

const COMPONENT_NAME = 'Button';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Button = (props: ButtonProps) => {
  const { className, children, disabled, loading, asChild, ...buttonProps } = extractProps(
    props,
    buttonPropDefs
  );
  const Component = asChild ? Slot.Root : 'button';
  return (
    <ButtonBase
      className={cn(componentClassName, className)}
      disabled={disabled || loading}
      aria-label={loading ? 'Loading' : undefined}
      asChild
      {...buttonProps}
    >
      <Component>
        {loading
          ? getSubtree({ asChild, children }, children => (
              <div className={`${componentClassName}Loading`}>
                <div>
                  <Spinner size="xs" currentColor />
                </div>
                <span className={`${componentClassName}Hidden`}>{children}</span>
              </div>
            ))
          : children}
      </Component>
    </ButtonBase>
  );
};

Button.displayName = COMPONENT_NAME;
