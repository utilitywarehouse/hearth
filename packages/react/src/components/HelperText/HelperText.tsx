import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import { HelperTextProps } from './HelperText.props';

const componentName = 'HelperText';
const componentClassName = withGlobalPrefix(componentName);

type HelperTextElement = ElementRef<'span'>;

export const HelperText = React.forwardRef<HelperTextElement, HelperTextProps>((props, ref) => {
  const { children, disabled, disableUserSelect, className, ...helperTextProps } = extractProps(
    props,
    marginPropDefs
  );
  return (
    <BodyText
      size="md"
      as="span"
      ref={ref}
      className={clsx(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      data-disable-user-select={disableUserSelect ? '' : undefined}
      {...helperTextProps}
    >
      {children}
    </BodyText>
  );
});

HelperText.displayName = componentName;
