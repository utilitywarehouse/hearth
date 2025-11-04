import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useMemo } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Badge } from '../../Badge';
import { IconContainer } from '../../IconContainer';
import { Skeleton } from '../../Skeleton';
import { useCardContext } from '../Card.context';
import { CardActionContext, ICardActionContext } from './CardAction.context';
import type CardActionProps from './CardAction.props';
import CardActionContent from './CardActionContent';
import CardActionHelperText from './CardActionHelperText';
import CardActionIcon from './CardActionIcon';
import CardActionLeadingContent from './CardActionLeadingContent';
import CardActionText from './CardActionText';
import CardActionTrailingContent from './CardActionTrailingContent';
import CardActionTrailingIcon from './CardActionTrailingIcon';

const CardActionRoot = ({
  heading,
  helperText,
  leadingContent,
  trailingContent,
  disabled,
  loading,
  children,
  states,
  badge,
  badgePosition = 'bottom',
  iconContainer = true,
  iconContainerColor,
  iconContainerSize,
  iconContainerVariant,
  leadingIcon,
  trailingIcon = ChevronRightSmallIcon,
  size = 'md',
  ...props
}: CardActionProps & { states?: { active?: boolean; disabled?: boolean }; isFirst?: boolean }) => {
  const { onPress } = props;
  const { active } = states || { active: false };

  const isLoading = loading;
  const showPressed = isLoading ? false : !!onPress;
  const isDisabled = disabled || false;

  const testID = props.testID || 'card-action';
  const loadingTestID = isLoading ? `${testID}-loading` : testID;

  const { variant, hasOnlyActions } = useCardContext();
  const isFirst = props.isFirst;

  styles.useVariants({
    showPressed,
    active,
    disabled: isDisabled || isLoading,
    showDisabled: disabled,
    hasIconContainer: !loading && iconContainer,
    variant,
    isFirst: hasOnlyActions && isFirst,
  });

  const value: ICardActionContext = useMemo(() => {
    return {
      showPressed,
      active: active || false,
      loading: isLoading || false,
      disabled: isDisabled,
      size,
    };
  }, [active, showPressed, isLoading, isDisabled, size]);

  if (loading) {
    return (
      <Pressable
        {...props}
        testID={loadingTestID}
        style={[styles.container, styles.alignCenter, props.style as ViewStyle]}
        disabled={isDisabled}
      >
        {leadingContent || leadingIcon ? (
          <Skeleton width={24} height={24} style={styles.alignCenter} />
        ) : null}
        <CardActionContent>
          <Skeleton width="80%" height={24} borderRadius="xs" />
          <Skeleton width="100%" height={24} borderRadius="xs" />
        </CardActionContent>
        {trailingIcon || trailingContent ? (
          <Skeleton width={24} height={24} borderRadius="xs" style={styles.alignCenter} />
        ) : null}
      </Pressable>
    );
  }

  return (
    <CardActionContext.Provider value={value}>
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
            {leadingIcon && iconContainer ? (
              <View style={styles.iconContainerWrap}>
                <IconContainer
                  style={styles.iconContainer}
                  icon={leadingIcon}
                  size={iconContainerSize}
                  variant={iconContainerVariant}
                  color={iconContainerColor}
                  radiusNone
                />
              </View>
            ) : null}
            <View style={styles.withIconContainer}>
              {leadingContent ? (
                <CardActionLeadingContent>{leadingContent}</CardActionLeadingContent>
              ) : null}
              {leadingIcon && !iconContainer && !leadingContent ? (
                <CardActionLeadingContent>
                  <CardActionIcon as={leadingIcon} />
                </CardActionLeadingContent>
              ) : null}
              <CardActionContent>
                {badgePosition === 'top' && badge ? <Badge {...badge} /> : null}
                <CardActionText>{heading}</CardActionText>
                {badgePosition === 'middle' && badge ? <Badge {...badge} /> : null}
                {helperText ? <CardActionHelperText>{helperText}</CardActionHelperText> : null}
                {badgePosition === 'bottom' && badge ? <Badge {...badge} /> : null}
              </CardActionContent>
              {badgePosition === 'right' && badge ? (
                <Badge {...badge} style={[badge.style, styles.alignCenter]} />
              ) : null}
              {trailingContent ? (
                <CardActionTrailingContent>{trailingContent}</CardActionTrailingContent>
              ) : null}
              {trailingIcon && !trailingContent ? (
                <CardActionTrailingContent>
                  <CardActionTrailingIcon as={trailingIcon} />
                </CardActionTrailingContent>
              ) : null}
            </View>
          </>
        )}
      </Pressable>
    </CardActionContext.Provider>
  );
};

CardActionRoot.displayName = 'CardActionRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: theme.components.cardAction.content.paddingVertical,
    paddingHorizontal: theme.components.cardAction.content.paddingHorizontal,
    flexDirection: 'row',
    gap: theme.components.cardAction.content.gap,
    borderTopWidth: theme.borderWidth[1],
    borderColor: theme.color.border.strong,
    width: '100%',
    variants: {
      isFirst: {
        true: {
          borderTopWidth: 0,
        },
      },
      disabled: {
        true: {
          cursor: 'auto',
        },
      },
      variant: {
        subtle: {
          borderColor: theme.color.border.subtle,
        },
        emphasis: {
          borderColor: theme.color.border.strong,
        },
      },
      hasIconContainer: {
        true: {
          paddingHorizontal: 0,
          paddingVertical: 0,
          gap: 0,
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
  withIconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: theme.components.list.item.functional.padding,
    paddingHorizontal: theme.components.list.item.functional.padding,
    gap: theme.components.list.item.gap,
    flex: 1,
    variants: {
      hasIconContainer: {
        true: {},
        false: {
          flex: 1,
          paddingHorizontal: 0,
          paddingVertical: 0,
          alignItems: 'center',
        },
      },
    },
  },
  alignCenter: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    _web: {
      overflow: 'visible',
      height: '100%',
    },
  },
  iconContainerWrap: {
    flexDirection: 'column',
  },
}));

export default CardActionRoot;
