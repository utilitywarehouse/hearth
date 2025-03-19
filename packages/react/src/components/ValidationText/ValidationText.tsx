import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import { ValidationTextProps } from './ValidationText.props';
import { TickMediumContainedIcon, WarningMediumContainedIcon } from '@utilitywarehouse/react-icons';

const componentName = 'ValidationText';
const componentClassName = withGlobalPrefix(componentName);

type ValidationTextElement = ElementRef<'span'>;

export const ValidationText = React.forwardRef<ValidationTextElement, ValidationTextProps>(
  (props, ref) => {
    const {
      children,
      status = 'valid',
      disableUserSelect,
      className,
      ...validationTextProps
    } = extractProps(props, marginPropDefs);
    const icons: { [key: string]: typeof TickMediumContainedIcon } = {
      valid: TickMediumContainedIcon,
      invalid: WarningMediumContainedIcon,
    };
    const Icon = icons[status] as JSX.ElementType;

    return (
      <BodyText
        size="sm"
        as="span"
        ref={ref}
        className={clsx(componentClassName, className)}
        data-disable-user-select={disableUserSelect ? '' : undefined}
        data-status={status}
        {...validationTextProps}
      >
        <Icon />
        {children}
      </BodyText>
    );
  }
);

ValidationText.displayName = componentName;
