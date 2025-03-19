import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import { SupportingTextProps } from './SupportingText.props';

const componentName = 'SupportingText';
const componentClassName = withGlobalPrefix(componentName);

type SupportingTextElement = ElementRef<'span'>;

export const SupportingText = React.forwardRef<SupportingTextElement, SupportingTextProps>(
  (props, ref) => {
    const { children, disabled, disableUserSelect, className, ...supportingTextProps } =
      extractProps(props, marginPropDefs);
    return (
      <BodyText
        size="md"
        as="span"
        ref={ref}
        className={clsx(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
        data-disable-user-select={disableUserSelect ? '' : undefined}
        {...supportingTextProps}
      >
        {children}
      </BodyText>
    );
  }
);

SupportingText.displayName = componentName;
