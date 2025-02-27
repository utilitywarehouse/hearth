import React, { forwardRef, useEffect, useMemo } from 'react';
import type ListItemProps from './ListItem.props';
import { ChevronRight01MediumIcon } from '../../../../docs/components/icons';
// import { Skeleton } from '../../Skeleton';
import { useListContext } from '../List.context';
import { StyleSheet } from 'react-native-unistyles';
import { Pressable, ViewStyle } from 'react-native';
import { IListItemContext, ListItemContext } from './ListItem.context';
import type { PressableRef } from '../../../types';
import ListItemContent from './ListItemContent';
import ListItemLeadingContent from './ListItemLeadingContent';
import ListItemText from './ListItemText';
import ListItemSupportingText from './ListItemSupportingText';
import ListItemTrailingContent from './ListItemTrailingContent';
import ListItemTrailingIcon from './ListItemTrailingIcon';

const ListItemRoot = forwardRef<
  PressableRef,
  ListItemProps & { states?: { active?: boolean; disabled?: boolean } }
>(
  (
    {
      text,
      supportingText,
      leadingContent,
      trailingContent,
      disabled,
      divider,
      dividerColor,
      loading,
      children,
      states,
      variant = 'subtle',
      ...props
    },
    ref
  ) => {
    const { onPress } = props;
    const listContext = useListContext();
    const { active } = states || { active: false };

    const getListContainer = (): ListItemProps['variant'] => {
      const listVariant = listContext?.container?.split(' ')?.[0];
      if (listVariant && listVariant !== 'none') {
        return listVariant as ListItemProps['variant'];
      }
      return undefined;
    };

    const isLoading = loading || listContext?.loading;
    const showPressed = isLoading ? false : !!onPress;
    const showDivider = listContext?.divider ?? divider;
    const isDisabled = disabled || listContext?.disabled || false;
    const listItemVariant = getListContainer() || variant;

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

    // if (loading || listContext?.loading) {
    //   return (
    //     <Pressable
    //       ref={ref}
    //       {...props}
    //       style={[styles.container, props.style as ViewStyle]}
    //       disabled={isDisabled}
    //     >
    //       {leadingContent ? <Skeleton width={24} height={24} /> : null}
    //       <ListItemContent>
    //         <Skeleton
    //           width="80%"
    //           height={20}
    //           backgroundColor="$grey100"
    //           $dark-backgroundColor="$darkGrey400"
    //         />
    //         <Skeleton width="100%" height={16} />
    //       </ListItemContent>
    //       {onPress || trailingContent ? <Skeleton width={24} height={24} /> : null}
    //     </Pressable>
    //   );
    // }

    return (
      <ListItemContext.Provider value={value}>
        <Pressable
          ref={ref}
          {...props}
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
                {supportingText ? (
                  <ListItemSupportingText>{supportingText}</ListItemSupportingText>
                ) : null}
              </ListItemContent>
              {trailingContent ? (
                <ListItemTrailingContent>{trailingContent}</ListItemTrailingContent>
              ) : !!onPress ? (
                <ListItemTrailingContent>
                  <ListItemTrailingIcon as={ChevronRight01MediumIcon} />
                </ListItemTrailingContent>
              ) : null}
            </>
          )}
        </Pressable>
      </ListItemContext.Provider>
    );
  }
);

ListItemRoot.displayName = 'ListItemRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: theme.components.list.item.paddingVertical,
    paddingHorizontal: theme.components.list.item.paddingHorizontal,
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
          opacity: 0.5,
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
