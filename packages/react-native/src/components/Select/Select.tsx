import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import SelectProps, { SelectOptionItemProps } from './Select.props';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetView,
} from '../BottomSheet';
import { SelectContext } from './Select.context';
import { useFormFieldContext } from '../FormField';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { BodyText } from '../BodyText';
import { DetailText } from '../DetailText';
import SelectOption from './SelectOption';
import { Label } from '../Label';
import { Input } from '../Input';
import { Icon } from '../Icon';

const Select = forwardRef<View, SelectProps>(
  (
    {
      options = [],
      value,
      onValueChange,
      label,
      placeholder = 'Select an option',
      disabled = false,
      leadingIcon: LeadingIcon,
      validationStatus = 'initial',
      required = true,
      children,
      bottomSheetProps,
      menuHeading,
      readonly = false,
      emptyText = 'No options available',
      listProps,
      searchable = false,
      searchPlaceholder = 'Search',
      ...rest
    },
    ref
  ) => {
    const formFieldContext = useFormFieldContext();
    const validationStatusFromContext = formFieldContext?.validationStatus ?? validationStatus;
    const isRequired = formFieldContext?.required ?? required;
    const isDisabled = formFieldContext?.disabled ?? disabled;
    const isReadonly = formFieldContext?.readonly ?? readonly;

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
          if (React.isValidElement(child) && child.props.value === value) {
            setSelectedLabel(child.props.label);
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

    const filteredOptions = searchable
      ? options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()))
      : options;

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
          leadingIcon={item.leadingIcon}
          trailingIcon={item.trailingIcon}
        />
      ),
      []
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
      <View ref={ref} {...rest} style={[styles.container, rest.style]}>
        {!!label && (
          <View>
            <Label>
              {label}
              {!isRequired && <Label> (Optional)</Label>}
            </Label>
          </View>
        )}

        <Pressable
          onPress={openBottomSheet}
          disabled={isDisabled || isReadonly}
          style={({ pressed }) => [
            styles.selectContainer,
            styles.pressedContainer(pressed || isOpen),
          ]}
        >
          {!!LeadingIcon && (
            <View>
              <Icon as={LeadingIcon} style={styles.icon} />
            </View>
          )}

          <View style={styles.optionContainer}>
            <BodyText numberOfLines={1} style={styles.placeholderText}>
              {selectedOption?.label || selectedLabel || placeholder}
            </BodyText>
          </View>

          <View>
            <ExpandSmallIcon style={styles.icon as ViewStyle} />
          </View>
        </Pressable>

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
                  onChangeText={setSearch}
                  type="search"
                />
              </View>
            )}

            {children ? (
              <BottomSheetScrollView>{children}</BottomSheetScrollView>
            ) : (
              <BottomSheetFlatList
                data={filteredOptions}
                keyExtractor={option => option.value}
                renderItem={renderSelectOption}
                ListEmptyComponent={renderEmptyComponent}
                {...listProps}
              />
            )}
          </SelectContext.Provider>
        </BottomSheetModal>
      </View>
    );
  }
);

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.select.gap,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.components.select.backgroundColor,
    borderWidth: theme.components.select.borderWidth,
    borderColor: theme.components.select.borderColor,
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
          borderColor: theme.components.select.borderColorReadOnly,
        },
      },
      validationStatus: {
        initial: {},
        valid: {
          borderColor: theme.components.select.borderColorValid,
        },
        invalid: {
          borderColor: theme.components.select.borderColorInvalid,
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
    outlineColor: pressed ? theme.components.select.borderColor : 'transparent',
    variants: {
      validationStatus: {
        initial: {},
        valid: {
          outlineColor: theme.components.select.borderColorValid,
        },
        invalid: {
          outlineColor: theme.components.select.borderColorInvalid,
        },
      },
    },
  }),
  icon: {
    color: theme.components.icon.color,
  },
  placeholderText: {
    variants: {
      hasValue: {
        false: {
          color: theme.components.text.colorSecondary,
        },
      },
    },
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

Select.displayName = 'Select';

export default Select;
