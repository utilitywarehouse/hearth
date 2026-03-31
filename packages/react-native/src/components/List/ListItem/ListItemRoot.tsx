import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useId, useLayoutEffect, useMemo } from 'react';
import { Pressable, ViewStyle } from 'react-native';
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

const ListItemRoot = ({
  heading,
  helperText,
  leadingContent,
  trailingContent,
  disabled,
  loading,
  children,
  states,
  variant = 'subtle',
  badge,
  badgePosition = 'bottom',
  numericValue,
  truncateHeading = false,
  truncateHelperText = false,
  ...props
}: ListItemProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { onPress } = props;
  const listContext = useListContext();
  const { registerItem, firstItemId } = listContext;
  const { active } = states || { active: false };
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

  const testID = props.testID || 'list-item';
  const loadingTestID = isLoading ? `${testID}-loading` : testID;

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
        style={[styles.container, props.style as ViewStyle]}
        disabled={isDisabled}
      >
        {leadingContent ? <Skeleton width={24} height={24} /> : null}
        <ListItemContent>
          <Skeleton width="80%" height={20} />
          <Skeleton width="100%" height={16} />
        </ListItemContent>
        {onPress || trailingContent ? <Skeleton width={24} height={24} /> : null}
      </Pressable>
    );
  }

  return (
    <ListItemContext.Provider value={value}>
      <Pressable
        {...props}
        testID={testID}
        style={[styles.container, props.style as ViewStyle]}
        disabled={isDisabled}
        accessibilityRole={onPress ? 'button' : undefined}
      >
        {children ? (
          children
        ) : (
          <>
            {leadingContent ? (
              <ListItemLeadingContent>{leadingContent}</ListItemLeadingContent>
            ) : null}
            <ListItemContent>
              {badgePosition === 'top' && badge ? badge : null}
              <ListItemHeading truncated={truncateHeading}>{heading}</ListItemHeading>
              {helperText ? (
                <ListItemHelperText truncated={truncateHelperText}>{helperText}</ListItemHelperText>
              ) : null}
              {badgePosition === 'bottom' && badge ? badge : null}
            </ListItemContent>
            {!!numericValue && <BodyText weight="semibold">{numericValue}</BodyText>}
            {trailingContent ? (
              <ListItemTrailingContent>{trailingContent}</ListItemTrailingContent>
            ) : onPress ? (
              <ListItemTrailingContent style={styles.centeredTrailingIcon}>
                <ListItemTrailingIcon as={ChevronRightSmallIcon} />
              </ListItemTrailingContent>
            ) : null}
          </>
        )}
      </Pressable>
    </ListItemContext.Provider>
  );
};

ListItemRoot.displayName = 'ListItemRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: theme.components.list.item.functional.padding,
    paddingHorizontal: theme.components.list.item.functional.padding,
    flexDirection: 'row',
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
  centeredTrailingIcon: {
    justifyContent: 'center',
  },
}));

export default ListItemRoot;
