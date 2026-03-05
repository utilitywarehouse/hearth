'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { useIds } from '../../hooks/use-ids';
import { InputBase, type InputBaseElement } from '../InputBase/InputBase';
import type { DateInputSegmentProps } from './DateInputSegment.props';
import { forwardRef } from 'react';

const COMPONENT_NAME = 'DateInputSegment';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const DateInputSegment = forwardRef<InputBaseElement, DateInputSegmentProps>(
  ({ className, label, placeholder, value, disabled, required, id: providedId, ...props }, ref) => {
    const { id, labelId } = useIds({ providedId, prefix: 'date-input-segment' });

    return (
      <Flex className={cn(componentClassName, className)} data-disabled={disabled ? '' : undefined}>
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
