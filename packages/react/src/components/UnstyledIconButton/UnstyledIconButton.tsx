import * as React from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { unstyledIconButtonPropDefs } from './UnstyledIconButton.props';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import { extractProps } from '../../helpers/extract-props';

const componentName = 'UnstyledIconButton';
const componentClassName = withGlobalPrefix(componentName);

export type UnstyledIconButtonElement = ElementRef<'button'>;

export const UnstyledIconButton = React.forwardRef<
  UnstyledIconButtonElement,
  UnstyledIconButtonProps
>((props, forwardedRef) => {
  const { className, label, ...unstyledIconButtonProps } = extractProps(
    props,
    unstyledIconButtonPropDefs
  );
  return (
    <button
      ref={forwardedRef}
      className={clsx(componentClassName, className)}
      aria-label={label}
      {...unstyledIconButtonProps}
    />
  );
});

UnstyledIconButton.displayName = componentName;
