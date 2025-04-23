import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import SelectProps, { SelectItemProps } from './Select.props';
import { BottomSheetModal, BottomSheetFlatList } from '../BottomSheet';
import { SelectContext } from './Select.context';
import { useFormFieldContext } from '../FormField';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { BodyText } from '../BodyText';
import { DetailText } from '../DetailText';
import SelectOption from './SelectOption';
import { Label } from '../Label';
import { Input } from '../Input';

const Select = forwardRef<View, SelectProps>(
  (
    {
      items = [],
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

    const selectedItem = items.find(item => item.value === value);

    styles.useVariants({
      disabled: isDisabled,
      validationStatus: validationStatusFromContext,
      readonly: isReadonly,
      hasValue: !!selectedItem?.label,
    });

    const filteredItems = searchable
      ? items.filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
      : items;

    const openBottomSheet = useCallback(() => {
      if (isDisabled) return;
      bottomSheetModalRef.current?.present();
    }, [isDisabled]);

    const closeBottomSheet = useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
    }, []);

    const renderSelectItem = useCallback(
      ({ item }: { item: SelectItemProps }) => (
        <SelectOption
          label={item.label}
          value={item.value}
          leftIcon={item.leftIcon}
          rightIcon={item.rightIcon}
        />
      ),
      []
    );

    const renderEmptyComponent = useCallback(
      () => (
        <View style={styles.emptyContainer}>
          <DetailText>{emptyText}</DetailText>
        </View>
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
          disabled={isDisabled}
          style={({ pressed }) => [styles.selectContainer, styles.pressedContainer(pressed)]}
        >
          {!!LeadingIcon && (
            <View>
              <LeadingIcon />
            </View>
          )}

          <BodyText numberOfLines={1} style={styles.placeholderText}>
            {selectedItem?.label || placeholder}
          </BodyText>

          <View>
            <ExpandSmallIcon />
          </View>
        </Pressable>

        <SelectContext.Provider
          value={{
            selectedValue: value,
            onValueChange,
            close: closeBottomSheet,
          }}
        >
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={['60%']}
            index={0}
            {...bottomSheetProps}
          >
            <View style={styles.bottomSheetContainer}>
              {searchable && (
                <View>
                  <Input
                    placeholder={searchPlaceholder}
                    value={search}
                    onChangeText={setSearch}
                    type="search"
                  />
                </View>
              )}

              {children ? (
                <View>{children}</View>
              ) : (
                <BottomSheetFlatList
                  data={filteredItems}
                  keyExtractor={item => item.value}
                  renderItem={renderSelectItem}
                  ListEmptyComponent={renderEmptyComponent}
                  {...listProps}
                />
              )}
            </View>
          </BottomSheetModal>
        </SelectContext.Provider>
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
  pressedContainer: pressed => ({
    outlineWidth: pressed ? theme.components.select.borderWidth : 0,
    outlineStyle: 'solid',
    outlineColor: pressed ? theme.components.select.borderColor : 'transparent',
  }),
  placeholderText: {
    variants: {
      hasValue: {
        true: {
          color: theme.components.text.colorSecondary,
        },
      },
    },
  },
  bottomSheetContainer: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

Select.displayName = 'Select';

export default Select;
