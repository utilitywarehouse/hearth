'use client';

import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../helpers/cn';
import type { ChangeEvent } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TextInput } from '../TextInput/TextInput';
import { InputSlot } from '../InputSlot/InputSlot';
import type { CurrencyInputProps } from './CurrencyInput.props';
import { DetailText } from '../DetailText/DetailText';
import type { InputBaseElement } from '../InputBase/InputBase';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';

const COMPONENT_NAME = 'CurrencyInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CurrencyInput = forwardRef<InputBaseElement, CurrencyInputProps>(
  (
    {
      className,
      disabled,
      value: controlledValue,
      onChange,
      placeholder = '0.00',
      disableGroupSeparators,
      defaultValue,
      ...props
    },
    forwardedRef
  ) => {
    const maxDecimals = 2;
    const [internalValue, setInternalValue] = useState<string>(
      typeof defaultValue === 'string' ? defaultValue : ''
    );
    const internalRef = useRef<HTMLInputElement>(null);
    const cursorPositionRef = useRef<number | null>(null);

    // Merge forwarded ref (if any) with internal ref
    const inputRef = useMergedRefs(forwardedRef, internalRef);

    const isControlled = controlledValue !== undefined;
    const numericValue = isControlled ? String(controlledValue ?? '') : internalValue;

    // Format value for display
    const formatValue = (value: string): string => {
      if (!value) return '';

      const parts = value.split('.');
      let integerPart = parts[0] || '';

      if (!disableGroupSeparators) {
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      const decimalPart = parts[1];
      return decimalPart !== undefined ? integerPart + '.' + decimalPart : integerPart;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const input = e.target.value;
      const cursorPosition = e.target.selectionStart || 0;
      const previousDisplayValue = formatValue(numericValue);

      // Remove all non-digits except decimal
      const cleaned = input.replace(/[^\d.]/g, '');

      // Ensure only one decimal point
      const parts = cleaned.split('.');
      const sanitized = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : cleaned;

      // Limit decimal places
      const finalParts = sanitized.split('.');
      const limitedValue =
        finalParts[1] !== undefined
          ? finalParts[0] + '.' + finalParts[1].substring(0, maxDecimals)
          : sanitized;

      // Calculate new cursor position
      if (!disableGroupSeparators) {
        const newDisplayValue = formatValue(limitedValue);
        const oldCommasBeforeCursor = (
          previousDisplayValue
            .slice(0, Math.min(cursorPosition, previousDisplayValue.length))
            .match(/,/g) || []
        ).length;
        const newCommasBeforeCursor = (
          newDisplayValue.slice(0, Math.min(cursorPosition, newDisplayValue.length)).match(/,/g) ||
          []
        ).length;
        const commaDiff = newCommasBeforeCursor - oldCommasBeforeCursor;
        cursorPositionRef.current = cursorPosition + commaDiff;
      } else {
        cursorPositionRef.current = null;
      }
      if (!isControlled) {
        setInternalValue(limitedValue);
      }

      // Return numeric value WITHOUT commas
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: limitedValue, // Raw numeric value without commas
          },
          currentTarget: {
            ...e.currentTarget,
            value: limitedValue,
          },
        } as ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
      }
    };

    // Restore cursor position after render
    useEffect(() => {
      if (
        internalRef &&
        typeof internalRef === 'object' &&
        internalRef.current &&
        cursorPositionRef.current !== null
      ) {
        internalRef.current.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);
        cursorPositionRef.current = null;
      }
    });

    return (
      <TextInput
        ref={inputRef}
        className={cn(componentClassName, className)}
        type="text"
        inputMode="decimal"
        disabled={disabled}
        value={formatValue(numericValue)} // Display with commas
        onChange={handleChange}
        placeholder={placeholder}
        data-testid={componentClassName}
        {...props}
      >
        <InputSlot placement="prefix">
          <DetailText size="3xl">£</DetailText>
        </InputSlot>
      </TextInput>
    );
  }
);

CurrencyInput.displayName = COMPONENT_NAME;
