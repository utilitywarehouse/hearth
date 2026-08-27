'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { ButtonBase, ButtonBaseElement } from '../ButtonBase/ButtonBase';
import { buttonPropDefs } from './Button.props';
import type { ButtonProps } from './Button.props';
import { Spinner } from '../Spinner/Spinner';
import { getSubtree } from '../../helpers/get-subtree';
import { forwardRef } from 'react';

const COMPONENT_NAME = 'Button';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

/**
 * Use Button to trigger an action or event, such as submitting a form or
 * displaying a dialog. Use the `variant` prop to convey emphasis — `emphasis`
 * and `solid` for primary actions, `outline` for medium-emphasis, non-critical
 * actions, and `ghost` for the lowest-prominence actions. For actions that
 * navigate somewhere, use a link instead, or render Button `asChild` with an
 * anchor or router link.
 *
 * @summary Triggers an action or event, such as submitting a form or displaying a dialog.
 */
export const Button = forwardRef<ButtonBaseElement, ButtonProps>((props, ref) => {
  const { className, children, disabled, loading, asChild, ...buttonProps } = extractProps(
    props,
    buttonPropDefs
  );
  const content = loading
    ? getSubtree({ asChild, children }, children => (
        <div className={`${componentClassName}Loading`}>
          <div>
            <Spinner size="xs" currentColor />
          </div>
          <span className={`${componentClassName}Hidden`}>{children}</span>
        </div>
      ))
    : children;
  return (
    <ButtonBase
      ref={ref}
      className={cn(componentClassName, className)}
      disabled={disabled || loading}
      aria-label={loading ? 'Loading' : undefined}
      data-testid={componentClassName}
      asChild={asChild}
      {...buttonProps}
    >
      {content}
    </ButtonBase>
  );
});

Button.displayName = COMPONENT_NAME;
