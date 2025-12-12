'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import { TextInput } from '../TextInput/TextInput';
import { InputSlot } from '../InputSlot/InputSlot';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import type { SearchInputProps } from './SearchInput.props';
import { Spinner } from '../Spinner/Spinner';
import { CloseSmallIcon, SearchMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import { useIds } from '../../hooks/use-ids';
import * as React from 'react';

const COMPONENT_NAME = 'SearchInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const SearchInput = ({
  className,
  disabled,
  value,
  onClear,
  loading,
  id: providedId,
  ref: forwardedRef,
  ...props
}: SearchInputProps) => {
  const defaultRef = React.useRef<HTMLInputElement | null>(null);
  const inputRef = forwardedRef || defaultRef;

  const handleClear = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (typeof onClear !== 'function' || event.button !== 0) {
        return;
      }
      onClear();

      if (inputRef && typeof inputRef === 'object' && inputRef.current) {
        inputRef.current.focus();
      }
    },
    [inputRef, onClear]
  );

  const { id } = useIds({ providedId, prefix: 'search-input' });

  return (
    <TextInput
      ref={inputRef}
      className={clsx(componentClassName, className)}
      type="search"
      role="search"
      enterKeyHint="search"
      disabled={disabled}
      hideLabel
      value={value}
      id={id}
      {...props}
    >
      <InputSlot placement="prefix">
        <SearchMediumIcon />
      </InputSlot>
      {loading ? (
        <InputSlot placement="suffix">
          <Spinner size="xs" color="primary" />
        </InputSlot>
      ) : null}
      {value !== undefined && String(value).length > 0 ? (
        <InputSlot placement="suffix">
          <UnstyledIconButton
            type="button"
            label="clear search"
            onClick={handleClear}
            disabled={disabled}
          >
            <CloseSmallIcon />
          </UnstyledIconButton>
        </InputSlot>
      ) : null}
    </TextInput>
  );
};

SearchInput.displayName = COMPONENT_NAME;
