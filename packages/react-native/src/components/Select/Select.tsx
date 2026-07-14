import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '../BottomSheet';
import { useBottomSheetContext } from '../BottomSheet/BottomSheet.context';
import { DetailText } from '../DetailText';
import { FormField, useFormFieldContext } from '../FormField';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { SelectContext } from './Select.context';
import SelectProps, { SelectOptionItemProps } from './Select.props';
import { filterOptionsByLabel } from './Select.utils';
import SelectOption from './SelectOption';

const Select = ({
  options = [],
  value,
  onValueChange,
  label,
  labelVariant = 'body',
  placeholder = 'Select an option',
  disabled = false,
  leadingIcon: LeadingIcon,
  validationStatus = 'initial',
  helperText,
  helperIcon,
  invalidText,
  validText,
  required = true,
  children,
  bottomSheetProps,
  menuHeading,
  readonly = false,
  emptyText = 'No options available',
  listProps,
  searchable = false,
  searchPlaceholder = 'Search',
  testID,
  ...rest
}: SelectProps) => {
  const formFieldContext = useFormFieldContext();
  const validationStatusFromContext = formFieldContext?.validationStatus ?? validationStatus;
  const isRequired = formFieldContext?.required ?? required;
  const isDisabled = formFieldContext?.disabled ?? disabled;
  const isReadonly = formFieldContext?.readonly ?? readonly;
  const { useSafeAreaInsets } = useBottomSheetContext();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined);

  // Find selected option from options prop
  const selectedOption = options.find(option => option.value === value);

  // Extract selected label from children if not using options prop
  React.useEffect(() => {
    if (!selectedOption && children && value) {
      // Find the selected child component's label
      React.Children.forEach(children, child => {
        if (React.isValidElement(child) && (child.props as any).value === value) {
          setSelectedLabel((child.props as any).label);
        }
      });
    } else {
      setSelectedLabel(undefined);
    }
  }, [children, value, selectedOption]);

  styles.useVariants({
    disabled: isDisabled,
    validationStatus: validationStatusFromContext,
    readonly: isReadonly,
    hasValue: !!selectedLabel || !!selectedOption?.label,
  });

  const filteredOptions = searchable ? filterOptionsByLabel(options, search) : options;

  const handleClose = useCallback((index: number) => {
    if (index === -1) {
      setSearch('');
      setIsOpen(false);
      return;
    }
  }, []);

  const openBottomSheet = useCallback(() => {
    if (isDisabled) return;
    bottomSheetModalRef.current?.present();
    setIsOpen(true);
  }, [isDisabled]);

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setIsOpen(false);
    setSearch('');
  }, []);

  const renderSelectOption = useCallback(
    ({ item }: { item: SelectOptionItemProps }) => (
      <SelectOption
        label={item.label}
        value={item.value}
        disabled={item.disabled}
        leadingIcon={item.leadingIcon}
        trailingIcon={item.trailingIcon}
        testID={testID ? `${testID}-option-${item.label}` : undefined}
      />
    ),
    [testID]
  );

  const renderEmptyComponent = useCallback(
    () => (
      <BottomSheetView style={styles.emptyContainer}>
        <DetailText>{emptyText}</DetailText>
      </BottomSheetView>
    ),
    [emptyText]
  );

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
      >
        <Pressable
          onPress={openBottomSheet}
          disabled={isDisabled || isReadonly}
          testID={testID}
          style={({ pressed }) => [
            styles.selectContainer,
            styles.pressedContainer(pressed || isOpen),
          ]}
        >
          {!!LeadingIcon && (
            <View>
              {(() => {
                const IconAny = Icon as any;
                return <IconAny as={LeadingIcon} style={styles.icon as any} />;
              })()}
            </View>
          )}

          <View style={styles.optionContainer}>
            <BodyText numberOfLines={1} style={styles.placeholderText}>
              {selectedOption?.label || selectedLabel || placeholder}
            </BodyText>
          </View>

          <View>
            <Icon as={ExpandSmallIcon} style={styles.icon} />
          </View>
        </Pressable>
      </FormField>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['25%', '40%', '80%']}
        onChange={handleClose}
        enableDynamicSizing={false}
        {...bottomSheetProps}
      >
        <SelectContext.Provider
          value={{
            selectedValue: value,
            onValueChange,
            close: closeBottomSheet,
          }}
        >
          <SafeAreaView
            edges={useSafeAreaInsets ? ['top'] : []}
            style={{ flex: 1 }}
            accessible={false}
          >
            {menuHeading && (
              <View style={styles.headingContainer}>
                <DetailText size="lg">{menuHeading}</DetailText>
              </View>
            )}
            {searchable && (
              <View style={styles.searchContainer}>
                <Input
                  placeholder={searchPlaceholder}
                  value={search}
                  inBottomSheet
                  onChangeText={setSearch}
                  type="search"
                  testID={testID ? `${testID}-search` : undefined}
                />
              </View>
            )}

            {children ? (
              <BottomSheetScrollView testID={testID ? `${testID}-options` : undefined}>
                {children}
              </BottomSheetScrollView>
            ) : (
              <BottomSheetFlatList
                data={filteredOptions}
                keyExtractor={(option: any) => option.value}
                renderItem={renderSelectOption}
                ListEmptyComponent={renderEmptyComponent}
                testID={testID ? `${testID}-options` : undefined}
                {...listProps}
              />
            )}
          </SafeAreaView>
        </SelectContext.Provider>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.select.gap,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.surface.neutral.strong,
    borderWidth: theme.components.select.borderWidth,
    borderColor: theme.color.border.strong,
    borderRadius: theme.components.select.borderRadius,
    paddingHorizontal: theme.components.select.paddingHorizontal,
    paddingVertical: theme.components.select.paddingVertical,
    gap: theme.components.select.gap,
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
        },
        invalid: {
          borderColor: theme.color.feedback.danger.border,
        },
      },
    },
  },
  disabledContainer: {
    opacity: 0.5,
  },
  optionContainer: {
    flex: 1,
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
  pressedContainer: pressed => ({
    outlineWidth: pressed ? theme.components.select.borderWidth : 0,
    outlineStyle: 'solid',
    outlineColor: pressed ? theme.color.border.strong : 'transparent',
    variants: {
      validationStatus: {
        initial: {},
        valid: {
          outlineColor: theme.color.feedback.positive.border,
        },
        invalid: {
          outlineColor: theme.color.feedback.danger.border,
        },
      },
    },
  }),
  icon: {
    color: theme.color.icon.primary,
  },
  placeholderText: {
    variants: {
      hasValue: {
        false: {
          color: theme.color.text.secondary,
        },
      },
    },
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.space.md,
  },
}));

Select.displayName = 'Select';

export default Select;
