import type { ChangeEvent, ElementRef } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import { TextInput } from '../TextInput/TextInput';
import { TextInputSlot } from '../TextInputSlot/TextInputSlot';
import { CurrencyInputProps } from './CurrencyInput.props';
import { DetailText } from '../DetailText/DetailText';

const COMPONENT_NAME = 'CurrencyInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CurrencyInputElement = ElementRef<'input'>;

// const numericValue = formattedValue.replace(/,/g, '');
// const asNumber = parseFloat(numericValue);

export const CurrencyInput = React.forwardRef<CurrencyInputElement, CurrencyInputProps>(
  (
    {
      className,
      disabled,
      value: controlledValue,
      onChange,
      placeholder = '0.00',
      disableGroupSeparators,
      ...props
    },
    forwardedRef
  ) => {
    const maxDecimals = 2;
    const [internalValue, setInternalValue] = useState<string>('');
    const internalRef = useRef<HTMLInputElement>(null);
    const cursorPositionRef = useRef<number | null>(null);

    // Use forwarded ref if provided, otherwise use internal ref
    const inputRef = (forwardedRef as React.RefObject<HTMLInputElement>) || internalRef;

    const isControlled = controlledValue !== undefined;
    const displayValue = isControlled ? controlledValue : internalValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const input = e.target.value;
      const cursorPosition = e.target.selectionStart || 0;
      const previousValue = e.target.value;

      // Remove all non-digits except decimal
      const cleaned = input.replace(/[^\d.]/g, '');

      // Handle empty input
      if (!cleaned) {
        cursorPositionRef.current = null;
        if (!isControlled) {
          setInternalValue('');
        }

        if (onChange && internalRef.current) {
          const syntheticEvent = {
            ...e,
            target: {
              ...e.target,
              value: '',
            },
            currentTarget: {
              ...e.currentTarget,
              value: '',
            },
          } as ChangeEvent<HTMLInputElement>;

          onChange(syntheticEvent);
        }
        return;
      }

      // Split on decimal
      const parts = cleaned.split('.');

      // Format integer part with commas (only if enabled)
      let integerPart = parts[0] || '';
      if (!disableGroupSeparators) {
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      // Limit decimal places
      let decimalPart = parts[1];
      if (decimalPart !== undefined) {
        decimalPart = decimalPart.substring(0, maxDecimals);
      }

      // Join back
      const formatted = decimalPart !== undefined ? integerPart + '.' + decimalPart : integerPart;

      // Calculate new cursor position (only matters when formatting is enabled)
      if (!disableGroupSeparators) {
        // Count how many commas were added/removed before the cursor
        const oldCommasBeforeCursor = (previousValue.slice(0, cursorPosition).match(/,/g) || [])
          .length;
        const newCommasBeforeCursor = (formatted.slice(0, cursorPosition).match(/,/g) || []).length;
        const commaDiff = newCommasBeforeCursor - oldCommasBeforeCursor;

        cursorPositionRef.current = cursorPosition + commaDiff;
      } else {
        // No commas, so cursor position doesn't need adjustment
        cursorPositionRef.current = null;
      }

      if (!isControlled) {
        setInternalValue(formatted);
      }

      // Create a synthetic event with the formatted value
      if (onChange && inputRef.current) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: formatted,
          },
          currentTarget: {
            ...e.currentTarget,
            value: formatted,
          },
        } as ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
      }
    };

    // Restore cursor position after render
    useEffect(() => {
      if (inputRef.current && cursorPositionRef.current !== null) {
        inputRef.current.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);
        cursorPositionRef.current = null;
      }
    });

    return (
      <TextInput
        ref={inputRef}
        className={clsx(componentClassName, className)}
        type="text"
        inputMode="decimal"
        disabled={disabled}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
      >
        <TextInputSlot placement="prefix">
          <DetailText size="3xl">£</DetailText>
        </TextInputSlot>
      </TextInput>
    );
  }
);

CurrencyInput.displayName = COMPONENT_NAME;
