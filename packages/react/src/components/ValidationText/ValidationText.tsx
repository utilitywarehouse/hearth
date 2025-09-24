import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import { ValidationTextProps } from './ValidationText.props';
import { TickCircleSmallIcon, ErrorCircleSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const componentName = 'ValidationText';
const componentClassName = withClassnameGlobalPrefix(componentName);

type ValidationTextElement = ElementRef<'span'>;

export const ValidationText = React.forwardRef<ValidationTextElement, ValidationTextProps>(
  (props, ref) => {
    const {
      children,
      status = 'valid',
      disableUserSelect,
      className,
      ...validationTextProps
    } = extractProps(props, marginPropDefs, textAlignPropDefs, textTransformPropDefs);

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
        {status === 'valid' ? (
          <TickCircleSmallIcon />
        ) : status === 'invalid' ? (
          <ErrorCircleSmallIcon />
        ) : null}
        {children}
      </BodyText>
    );
  }
);

ValidationText.displayName = componentName;
