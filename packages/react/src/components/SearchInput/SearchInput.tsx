import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import React from 'react';
import { TextInput } from '../TextInput/TextInput';
import { TextInputSlot } from '../TextInputSlot/TextInputSlot';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { SearchInputProps } from './SearchInput.props';
import { Spinner } from '../Spinner/Spinner';
import { CloseSmallIcon, SearchMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const componentName = 'SearchInput';
const componentClassName = withGlobalPrefix(componentName);

type SearchInputElement = ElementRef<'input'>;

export const SearchInput = React.forwardRef<SearchInputElement, SearchInputProps>(
  ({ className, disabled, value, onClear, loading, ...props }, forwardedRef) => {
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
        {...props}
      >
        <TextInputSlot placement="prefix">
          <SearchMediumIcon />
        </TextInputSlot>
        {loading ? (
          <TextInputSlot placement="suffix">
            <Spinner size="xs" color="grey1000" />
          </TextInputSlot>
        ) : null}
        {value !== undefined && String(value).length > 0 ? (
          <TextInputSlot placement="suffix">
            <UnstyledIconButton
              type="button"
              label="clear search"
              onClick={handleClear}
              disabled={disabled}
            >
              <CloseSmallIcon />
            </UnstyledIconButton>
          </TextInputSlot>
        ) : null}
      </TextInput>
    );
  }
);

SearchInput.displayName = componentName;
