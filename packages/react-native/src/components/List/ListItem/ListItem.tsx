import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { isValidElement, useId, useLayoutEffect, useMemo, useState } from 'react';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../../BodyText';
import { Skeleton } from '../../Skeleton';
import { useListContext } from '../List.context';
import { IListItemContext, ListItemContext } from './ListItem.context';
import type ListItemProps from './ListItem.props';
import ListItemContent from './ListItemContent';
import ListItemHeading from './ListItemHeading';
import ListItemHelperText from './ListItemHelperText';
import ListItemLeadingContent from './ListItemLeadingContent';
import ListItemTrailingContent from './ListItemTrailingContent';
import ListItemTrailingIcon from './ListItemTrailingIcon';

const ListItem = ({
  heading,
  helperText,
  leadingContent,
  trailingContent,
  disabled,
  loading,
  children,
  variant = 'subtle',
  badge,
  badgePosition = 'bottom',
  numericValue,
  truncateHeading = false,
  truncateHelperText = false,
  leadingContentProps,
  contentProps,
  trailingContentProps,
  leadingContentAlignment,
  contentAlignment,
  trailingContentAlignment,
  alignItems,
  ...props
}: ListItemProps) => {
  const { onPress } = props;
  const listContext = useListContext();
  const { registerItem, firstItemId } = listContext;
  const [active, setActive] = useState(false);
  const itemId = useId();

  useLayoutEffect(() => {
    if (!registerItem) {
      return;
    }

    return registerItem(itemId);
  }, [itemId, registerItem]);

  const isFirstChild = firstItemId === itemId;

  const getListContainer = (): ListItemProps['variant'] => {
    if (listContext?.container?.includes('subtle')) {
      return 'subtle';
    }
    if (listContext?.container?.includes('emphasis')) {
      return 'emphasis';
    }
    return undefined;
  };

  const isLoading = loading || listContext?.loading;
  const showPressed = isLoading ? false : !!onPress;
  const isDisabled = disabled || listContext?.disabled || false;
  const listItemVariant = getListContainer() || variant;

  // Trailing icons (the default chevron, or a `ListItemTrailingIcon` passed as `trailingContent`)
  // are centred; any other trailing content aligns to the top unless overridden.
  const showDefaultTrailingIcon = !trailingContent && !!onPress;
  const isTrailingIcon =
    showDefaultTrailingIcon ||
    (isValidElement(trailingContent) && trailingContent.type === ListItemTrailingIcon);
  // Part-specific alignment props win over `alignItems`, which wins over the defaults.
  const resolvedLeadingAlignment = leadingContentAlignment ?? alignItems ?? 'flex-start';
  const resolvedContentAlignment = contentAlignment ?? alignItems ?? 'center';
  const resolvedTrailingAlignment =
    trailingContentAlignment ?? alignItems ?? (isTrailingIcon ? 'center' : 'flex-start');

  // Alignment props come first so `style` passed through the part props still overrides them.
  const leadingContentStyle = [{ alignSelf: resolvedLeadingAlignment }, leadingContentProps?.style];
  const contentStyle = [{ alignSelf: resolvedContentAlignment }, contentProps?.style];
  const trailingContentStyle = [
    { alignSelf: resolvedTrailingAlignment },
    trailingContentProps?.style,
  ];

  const testID = props.testID || 'list-item';
  const loadingTestID = isLoading ? `${testID}-loading` : testID;

  const handlePressIn = (e: GestureResponderEvent) => {
    props.onPressIn?.(e);
    setActive(true);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    props.onPressOut?.(e);
    setActive(false);
  };

  styles.useVariants({
    variant: listItemVariant,
    showPressed,
    active,
    disabled: isDisabled || isLoading,
    showDisabled: !listContext.disabled && disabled,
    isFirstChild,
    container: listContext?.container,
  });

  const value: IListItemContext = useMemo(() => {
    return {
      showPressed,
      active,
      loading: isLoading,
      disabled: isDisabled,
    };
  }, [active, showPressed, isLoading, isDisabled]);

  if (loading || listContext?.loading) {
    return (
      <Pressable
        {...props}
        testID={loadingTestID}
        style={state => [
          styles.container,
          alignItems ? { alignItems } : undefined,
          (typeof props.style === 'function' ? props.style(state) : props.style) as ViewStyle,
        ]}
        disabled={isDisabled}
      >
        {leadingContent ? (
          <ListItemLeadingContent {...leadingContentProps} style={leadingContentStyle}>
            <Skeleton width={24} height={24} />
          </ListItemLeadingContent>
        ) : null}
        <ListItemContent {...contentProps} style={contentStyle}>
          <Skeleton width="80%" height={20} />
          <Skeleton width="100%" height={16} />
        </ListItemContent>
        {onPress || trailingContent ? (
          <ListItemTrailingContent {...trailingContentProps} style={trailingContentStyle}>
            <Skeleton width={24} height={24} />
          </ListItemTrailingContent>
        ) : null}
      </Pressable>
    );
  }

  return (
    <ListItemContext.Provider value={value}>
      <Pressable
        {...props}
        testID={testID}
        style={state => [
          styles.container,
          alignItems ? { alignItems } : undefined,
          (typeof props.style === 'function' ? props.style(state) : props.style) as ViewStyle,
        ]}
        disabled={isDisabled}
        accessibilityRole={props.accessibilityRole ?? (onPress ? 'button' : undefined)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children ? (
          children
        ) : (
          <>
            {leadingContent ? (
              <ListItemLeadingContent {...leadingContentProps} style={leadingContentStyle}>
                {leadingContent}
              </ListItemLeadingContent>
            ) : null}
            <ListItemContent {...contentProps} style={contentStyle}>
              {badgePosition === 'top' && badge ? badge : null}
              <ListItemHeading truncated={truncateHeading}>{heading}</ListItemHeading>
              {helperText ? (
                <ListItemHelperText truncated={truncateHelperText}>{helperText}</ListItemHelperText>
              ) : null}
              {badgePosition === 'bottom' && badge ? badge : null}
            </ListItemContent>
            {!!numericValue && <BodyText weight="semibold">{numericValue}</BodyText>}
            {trailingContent ? (
              <ListItemTrailingContent {...trailingContentProps} style={trailingContentStyle}>
                {trailingContent}
              </ListItemTrailingContent>
            ) : showDefaultTrailingIcon ? (
              <ListItemTrailingContent {...trailingContentProps} style={trailingContentStyle}>
                <ListItemTrailingIcon as={ChevronRightSmallIcon} />
              </ListItemTrailingContent>
            ) : null}
          </>
        )}
      </Pressable>
    </ListItemContext.Provider>
  );
};

ListItem.displayName = 'ListItem';

const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: theme.components.list.item.functional.padding,
    paddingHorizontal: theme.components.list.item.functional.padding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.components.list.item.gap,
    borderTopWidth: theme.borderWidth['1'],
    borderStyle: 'solid',
    variants: {
      isFirstChild: {
        true: {
          borderTopWidth: 0,
        },
      },
      variant: {
        subtle: {
          borderTopColor: theme.color.border.subtle,
        },
        emphasis: {
          borderTopColor: theme.color.border.strong,
        },
      },
      disabled: {
        true: {
          cursor: 'auto',
        },
      },
      showDisabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      showPressed: {
        true: {
          _web: {
            '_focus-visible': theme.helpers.focusVisible,
            _hover: {
              backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
            },
          },
        },
        false: {
          cursor: 'auto',
        },
      },
      active: {
        true: {},
      },
      container: {
        none: {
          paddingHorizontal: 0,
        },
        subtleWhite: {},
        emphasisWhite: {},
        subtleWarmWhite: {},
        emphasisWarmWhite: {},
      },
    },
    compoundVariants: [
      {
        showPressed: true,
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
        },
      },
    ],
  },
}));

export default ListItem;
