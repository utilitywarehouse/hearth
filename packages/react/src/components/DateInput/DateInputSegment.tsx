import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { useIds } from '../../hooks/use-ids';
import { ElementRef } from 'react';
import { InputBase } from '../InputBase/InputBase';
import { DateInputSegmentProps } from './DateInputSegment.props';

const COMPONENT_NAME = 'DateInputSegment';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DateInputSegmentElement = ElementRef<'input'>;

export const DateInputSegment = React.forwardRef<DateInputSegmentElement, DateInputSegmentProps>(
  ({ className, label, placeholder, value, disabled, required, id: providedId, ...props }, ref) => {
    const { id, labelId } = useIds({ providedId, prefix: 'date-input-segment' });

    return (
      <Flex
        className={clsx(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
      >
        <Label htmlFor={id} id={labelId} disableUserSelect>
          {label}
        </Label>

        <InputBase
          ref={ref}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          id={id}
          placeholder={!disabled ? placeholder : undefined}
          value={value}
          disabled={disabled}
          required={required}
          aria-labelledby={labelId}
          spellCheck="false"
          {...props}
        />
      </Flex>
    );
  }
);

DateInputSegment.displayName = COMPONENT_NAME;
