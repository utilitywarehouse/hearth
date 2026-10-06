import { forwardRef } from 'react';
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

/**
 * Use ValidationText alongside a form field to display a validation message,
 * with an icon and colour that reflect the `status` (`valid` or `invalid`).
 * For general, non-validation guidance about a field, use HelperText instead.
 *
 * @summary Validation feedback text for a form field, with a status icon.
 */
export const ValidationText = forwardRef<ValidationTextElement, ValidationTextProps>(
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
        data-testid={componentClassName}
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
