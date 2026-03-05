import * as React from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import type { ValidationTextProps } from './ValidationText.props';
import { TickCircleSmallIcon, ErrorCircleSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const COMPONENT_NAME = 'ValidationText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ValidationTextElement = ComponentRef<'span'>;

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
        ref={ref}
        as="span"
        size="sm"
        className={cn(componentClassName, className)}
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

ValidationText.displayName = COMPONENT_NAME;
