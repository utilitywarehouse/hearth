import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useMemo } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Skeleton } from '../../Skeleton';
import { useListContext } from '../List.context';
import { IListItemContext, ListItemContext } from './ListItem.context';
import type ListItemProps from './ListItem.props';
import ListItemContent from './ListItemContent';
import ListItemHelperText from './ListItemHelperText';
import ListItemLeadingContent from './ListItemLeadingContent';
import ListItemText from './ListItemText';
import ListItemTrailingContent from './ListItemTrailingContent';
import ListItemTrailingIcon from './ListItemTrailingIcon';

const ListItemRoot = ({
  text,
  helperText,
  leadingContent,
  trailingContent,
  disabled,
  divider,
  loading,
  children,
  states,
  variant = 'subtle',
  ...props
}: ListItemProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { onPress } = props;
  const listContext = useListContext();
  const { active } = states || { active: false };

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
  const showDivider = listContext?.divider ?? divider;
  const isDisabled = disabled || listContext?.disabled || false;
  const listItemVariant = getListContainer() || variant;

  const testID = props.testID || 'list-item';
  const loadingTestID = isLoading ? `${testID}-loading` : testID;

  styles.useVariants({
    divider: showDivider,
    variant: listItemVariant,
    showPressed,
    active,
    disabled: isDisabled || isLoading,
    showDisabled: !listContext?.disabled && disabled,
    isFirstChild: props.isFirst,
  });

  const value: IListItemContext = useMemo(() => {
    return {
      showPressed,
      divider: showDivider,
      active,
      loading: isLoading,
      disabled: isDisabled,
    };
  }, [active, showPressed, showDivider, isLoading, isDisabled]);

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
      >
        {children ? (
          children
        ) : (
          <>
            {leadingContent ? (
              <ListItemLeadingContent>{leadingContent}</ListItemLeadingContent>
            ) : null}
            <ListItemContent>
              <ListItemText>{text}</ListItemText>
              {helperText ? <ListItemHelperText>{helperText}</ListItemHelperText> : null}
            </ListItemContent>
            {trailingContent ? (
              <ListItemTrailingContent>{trailingContent}</ListItemTrailingContent>
            ) : onPress ? (
              <ListItemTrailingContent>
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
    padding: theme.components.list.item.padding,
    flexDirection: 'row',
    gap: theme.components.list.item.gap,
    variants: {
      divider: {
        true: {
          borderTopWidth: theme.borderWidth['1'],
          borderStyle: 'solid',
        },
      },
      isFirstChild: {
        true: {
          borderTopWidth: 0,
        },
      },
      variant: {
        subtle: {
          borderTopColor: theme.components.list.item.subtle.borderColor,
        },
        emphasis: {
          borderTopColor: theme.components.list.item.emphasis.borderColor,
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
        true: {},
        false: {
          cursor: 'auto',
        },
      },
      active: {
        true: {},
      },
    },
    compoundVariants: [
      {
        showPressed: true,
        active: true,
        styles: {
          backgroundColor: theme.components.list.item.backgroundColorActive,
        },
      },
    ],
  },
}));

export default ListItemRoot;
