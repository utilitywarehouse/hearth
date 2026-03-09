'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { cn } from '../../helpers/cn';
import type { ProgressStepLinkProps } from './ProgressStep.props';
import { ProgressStep } from './ProgressStep';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';

const COMPONENT_NAME = 'ProgressStepLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepLinkElement = ComponentRef<'a'>;

export const ProgressStepLink = forwardRef<ProgressStepLinkElement, ProgressStepLinkProps>(
  (
    {
      label,
      className,
      status,
      disabled,
      href,
      'aria-label': ariaLabel,
      children,
      asChild,
      ...props
    },
    ref
  ) => {
    const isActive = status === 'active';

    return (
      <ProgressStep
        status={status}
        className={cn(componentClassName, className)}
        aria-label={ariaLabel}
        label={label}
      >
        {isActive ? (
          label
        ) : (
          <Link
            ref={ref}
            {...props}
            href={disabled ? undefined : href}
            role="link"
            aria-disabled={disabled}
            asChild={asChild}
          >
            {getSubtree({ asChild, children }, children => (
              <>
                {children}
                {label}
              </>
            ))}
          </Link>
        )}
      </ProgressStep>
    );
  }
);

ProgressStepLink.displayName = COMPONENT_NAME;
