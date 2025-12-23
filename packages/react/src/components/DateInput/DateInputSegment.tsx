'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { useIds } from '../../hooks/use-ids';
import { InputBase } from '../InputBase/InputBase';
import type { DateInputSegmentProps } from './DateInputSegment.props';

const COMPONENT_NAME = 'DateInputSegment';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const DateInputSegment = ({
  className,
  label,
  placeholder,
  value,
  disabled,
  required,
  id: providedId,
  ...props
}: DateInputSegmentProps) => {
  const { id, labelId } = useIds({ providedId, prefix: 'date-input-segment' });

  return (
    <Flex className={cn(componentClassName, className)} data-disabled={disabled ? '' : undefined}>
      <Label htmlFor={id} id={labelId} disableUserSelect>
        {label}
      </Label>

      <InputBase
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
};

DateInputSegment.displayName = COMPONENT_NAME;
