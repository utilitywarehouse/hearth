import { CloseSmallIcon, SearchMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GestureResponderEvent, Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { BodyText } from '../BodyText';
import { BottomSheetFlatList, BottomSheetModal, BottomSheetView } from '../BottomSheet';
import { useBottomSheetContext } from '../BottomSheet/BottomSheet.context';
import { DetailText } from '../DetailText';
import { FormField, useFormFieldContext } from '../FormField';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Spinner } from '../Spinner';
import { UnstyledIconButton } from '../UnstyledIconButton';
import { ComboboxContext, ComboboxSelection } from './Combobox.context';
import ComboboxProps, {
  ComboboxOptionItemProps,
  ComboboxRenderContentProps,
} from './Combobox.props';
import { defaultFilterOption } from './Combobox.utils';
import ComboboxOption from './ComboboxOption';

const DEFAULT_SNAP_POINTS = ['25%', '40%', '80%'];

const Combobox = ({
  options = [],
  value,
  onValueChange,
  inputValue,
  onInputValueChange,
  label,
  labelVariant = 'body',
  placeholder = 'Search',
  searchPlaceholder = 'Search',
  disabled = false,
  validationStatus = 'initial',
  helperText,
  helperIcon,
  invalidText,
  validText,
  required = true,
  children,
  bottomSheetProps,
  menuHeading,
  noOptionsFoundText = 'No options found',
  listProps,
  loading = false,
  readonly = false,
  getValueLabel,
  filterOption,
  ...rest
}: ComboboxProps) => {
  const formFieldContext = useFormFieldContext();
  const validationStatusFromContext = formFieldContext?.validationStatus ?? validationStatus;
  const isRequired = formFieldContext?.required ?? required;
  const isDisabled = formFieldContext?.disabled ?? disabled;
  const isReadonly = formFieldContext?.readonly ?? readonly;
  const { color } = useTheme();
  const { useSafeAreaInsets } = useBottomSheetContext();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const searchInputRef = useRef<TextInput>(null);
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChildLabel, setSelectedChildLabel] = useState<string | undefined>(undefined);
  const [uncontrolledInputValue, setUncontrolledInputValue] = useState('');
  const isInputControlled = inputValue !== undefined;

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    if (typeof children === 'function' || !children || selectedOption || !value || getValueLabel) {
      setSelectedChildLabel(undefined);
      return;
    }

    let nextLabel: string | undefined;

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child) || nextLabel) {
        return;
      }

      if ((child.props as any).value === value) {
        nextLabel = (child.props as any).label;
      }
    });

    setSelectedChildLabel(nextLabel);
  }, [children, getValueLabel, selectedOption, value]);

  const selectedLabel = useMemo(() => {
    return getValueLabel?.(value) || selectedOption?.label || selectedChildLabel || '';
  }, [getValueLabel, selectedChildLabel, selectedOption?.label, value]);

  useEffect(() => {
    if (isInputControlled) {
      return;
    }

    setUncontrolledInputValue(selectedLabel);
  }, [isInputControlled, selectedLabel]);

  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, []);

  const search = isInputControlled ? (inputValue ?? '') : uncontrolledInputValue;

  const accessibilityLabel = useMemo(() => {
    if (!label) {
      return undefined;
    }

    return isRequired ? `${label}, required` : label;
  }, [isRequired, label]);

  const accessibilityHint = useMemo(() => {
    const hints: string[] = [];

    if (helperText) {
      hints.push(helperText);
    }

    if (validationStatusFromContext === 'invalid' && invalidText) {
      hints.push(invalidText);
    }

    if (validationStatusFromContext === 'valid' && validText) {
      hints.push(validText);
    }

    return hints.length > 0 ? hints.join(', ') : undefined;
  }, [helperText, invalidText, validText, validationStatusFromContext]);

  styles.useVariants({
    disabled: isDisabled,
    hasValue: search.length > 0,
    readonly: isReadonly,
    validationStatus: validationStatusFromContext,
  });

  const setSearch = useCallback(
    (nextValue: string) => {
      if (!isInputControlled) {
        setUncontrolledInputValue(nextValue);
      }

      onInputValueChange?.(nextValue);
    },
    [isInputControlled, onInputValueChange]
  );

  const handleClose = useCallback(
    (index: number) => {
      if (index === -1) {
        setIsOpen(false);
        setSearch('');
      }
    },
    [setSearch]
  );

  const focusSearchInput = useCallback(() => {
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
    }

    focusTimeoutRef.current = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300);
  }, []);

  const openBottomSheet = useCallback(() => {
    if (isDisabled || isReadonly) {
      return;
    }

    bottomSheetModalRef.current?.present();
    setIsOpen(true);
    focusSearchInput();
  }, [focusSearchInput, isDisabled, isReadonly]);

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setIsOpen(false);
  }, []);

  const selectOption = useCallback(
    ({ label: optionLabel, value: optionValue }: ComboboxSelection) => {
      setSearch(optionLabel);
      onValueChange?.(optionValue);
      closeBottomSheet();
    },
    [closeBottomSheet, onValueChange, setSearch]
  );

  const handleClear = useCallback(() => {
    setSearch('');
    onValueChange?.(null);
  }, [onValueChange, setSearch]);

  const handleClearPress = useCallback(
    (event: GestureResponderEvent) => {
      event.stopPropagation();
      handleClear();
    },
    [handleClear]
  );

  const filteredOptions = useMemo(() => {
    const optionFilter = filterOption ?? defaultFilterOption;

    return options.filter(option => optionFilter(option, search));
  }, [filterOption, options, search]);

  const renderSelectOption = useCallback(
    ({ item }: { item: ComboboxOptionItemProps }) => (
      <ComboboxOption
        label={item.label}
        value={item.value}
        disabled={item.disabled}
        leadingIcon={item.leadingIcon}
        trailingIcon={item.trailingIcon}
      />
    ),
    []
  );

  const renderEmptyComponent = useCallback(
    () => (
      <BottomSheetView style={styles.emptyContainer}>
        <DetailText>{noOptionsFoundText}</DetailText>
      </BottomSheetView>
    ),
    [noOptionsFoundText]
  );

  const renderContentProps = useMemo<ComboboxRenderContentProps>(
    () => ({
      close: closeBottomSheet,
      search,
      selectedValue: value,
      selectOption,
      setSearch,
    }),
    [closeBottomSheet, search, selectOption, setSearch, value]
  );

  const customContent = typeof children === 'function' ? children(renderContentProps) : children;

  return (
    <View {...rest} style={[styles.container, rest.style]}>
      <FormField
        label={label}
        labelVariant={labelVariant}
        helperText={helperText}
        helperIcon={helperIcon}
        validationStatus={validationStatusFromContext}
        required={isRequired}
        disabled={isDisabled}
        readonly={isReadonly}
        invalidText={invalidText}
        validText={validText}
        accessibilityHandledByChildren
      >
        <Pressable
          onPress={openBottomSheet}
          disabled={isDisabled || isReadonly}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityState={{ expanded: isOpen, disabled: isDisabled || isReadonly }}
          style={({ pressed }) => [styles.trigger, (pressed || isOpen) && styles.triggerFocused]}
        >
          <View style={styles.leadingIconContainer}>
            <Icon as={SearchMediumIcon} style={styles.icon} />
          </View>

          <View style={styles.valueContainer}>
            <BodyText numberOfLines={1} style={styles.valueText}>
              {search || placeholder}
            </BodyText>
          </View>

          {loading && <Spinner size="xs" color={color.icon.primary} />}

          {!!search && (
            <UnstyledIconButton
              accessibilityLabel="Clear search"
              onPress={handleClearPress}
              icon={CloseSmallIcon}
            />
          )}
        </Pressable>
      </FormField>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={DEFAULT_SNAP_POINTS}
        onChange={handleClose}
        enableDynamicSizing={false}
        {...bottomSheetProps}
      >
        <ComboboxContext.Provider
          value={{
            close: closeBottomSheet,
            search,
            selectedValue: value,
            selectOption,
            setSearch,
          }}
        >
          <SafeAreaView edges={useSafeAreaInsets ? ['top'] : []}>
            {menuHeading && (
              <View style={styles.headingContainer}>
                <DetailText size="lg">{menuHeading}</DetailText>
              </View>
            )}
            <View style={styles.searchContainer}>
              <Input
                ref={searchInputRef}
                placeholder={searchPlaceholder}
                value={search}
                inBottomSheet
                onChangeText={setSearch}
                type="search"
                clearable
                onClear={handleClear}
                loading={loading}
              />
            </View>
          </SafeAreaView>

          {customContent || (
            <BottomSheetFlatList
              data={filteredOptions}
              keyExtractor={(option: ComboboxOptionItemProps) => option.value}
              renderItem={renderSelectOption}
              ListEmptyComponent={renderEmptyComponent}
              {...listProps}
            />
          )}
        </ComboboxContext.Provider>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.select.gap,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: theme.components.input.height,
    backgroundColor: theme.color.surface.neutral.strong,
    borderWidth: theme.components.input.borderWidth,
    borderColor: theme.color.border.strong,
    borderRadius: theme.components.input.borderRadius,
    paddingHorizontal: theme.components.input.paddingHorizontal,
    gap: theme.components.input.gap,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      readonly: {
        true: {
          borderColor: theme.color.border.subtle,
        },
      },
      validationStatus: {
        initial: {},
        valid: {
          borderColor: theme.color.feedback.positive.border,
          outlineColor: theme.color.feedback.positive.border,
        },
        invalid: {
          borderColor: theme.color.feedback.danger.border,
          outlineColor: theme.color.feedback.danger.border,
        },
      },
    },
  },
  triggerFocused: {
    outlineStyle: 'solid',
    outlineWidth: theme.components.input.borderWidth,
    outlineColor: theme.color.border.strong,
  },
  leadingIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    flex: 1,
  },
  valueText: {
    variants: {
      hasValue: {
        false: {
          color: theme.color.text.secondary,
        },
      },
    },
  },
  icon: {
    color: theme.color.icon.primary,
  },
  headingContainer: {
    paddingHorizontal: theme.components.bottomSheet.padding,
    marginBottom: theme.components.select.gap,
  },
  searchContainer: {
    paddingTop: 1,
    paddingHorizontal: theme.components.bottomSheet.padding,
    paddingBottom: theme.components.select.gap,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.space.md,
  },
}));

Combobox.displayName = 'Combobox';

export default Combobox;
