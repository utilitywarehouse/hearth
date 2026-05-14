'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { cn } from '../../helpers/cn';
import { TextInput } from '../TextInput/TextInput';
import { InputSlot } from '../InputSlot/InputSlot';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import type { SearchInputProps } from './SearchInput.props';
import { Spinner } from '../Spinner/Spinner';
import { CloseSmallIcon, SearchMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import { useIds } from '../../hooks/use-ids';
import { forwardRef, useRef, useCallback } from 'react';
import type { InputBaseElement } from '../InputBase/InputBase';
import type { MouseEvent } from 'react';
import { useMergedRefs } from '@base-ui/utils/useMergedRefs';

const COMPONENT_NAME = 'SearchInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const SearchInput = forwardRef<InputBaseElement, SearchInputProps>(
  (
    {
      className,
      disabled,
      value,
      onClear,
      loading,
      hideLabel = true,
      helperText,
      id: providedId,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const inputRef = useMergedRefs(forwardedRef, internalRef);

    const handleClear = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (typeof onClear !== 'function' || event.button !== 0) {
          return;
        }
        onClear();

        if (internalRef && typeof internalRef === 'object' && internalRef.current) {
          internalRef.current.focus();
        }
      },
      [internalRef, onClear]
    );

    const { id } = useIds({ providedId, prefix: 'search-input' });

    return (
      <TextInput
        ref={inputRef}
        className={cn(componentClassName, className)}
        type="search"
        enterKeyHint="search"
        disabled={disabled}
        hideLabel={hideLabel}
        helperText={helperText}
        value={value}
        id={id}
        data-testid={componentClassName}
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
  }
);

SearchInput.displayName = COMPONENT_NAME;
