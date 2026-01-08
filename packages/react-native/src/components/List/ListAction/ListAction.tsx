import { createPressable } from '@gluestack-ui/pressable';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useListContext, useListFirstItemContext } from '../List.context';
import type ListActionProps from './ListAction.props';
import ListActionContent from './ListActionContent';
import ListActionText from './ListActionText';
import ListActionTrailingContent from './ListActionTrailingContent';
import ListActionTrailingIcon from './ListActionTrailingIcon';

const ListActionRoot = ({
  heading,
  disabled,
  variant = 'subtle',
  ...props
}: ListActionProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { onPress } = props;
  const listContext = useListContext();
  const isFirstContext = useListFirstItemContext();

  const { active } = props.states || { active: false };

  const getListContainer = (): ListActionProps['variant'] => {
    if (listContext?.container?.includes('subtle')) {
      return 'subtle';
    }
    if (listContext?.container?.includes('emphasis')) {
      return 'emphasis';
    }
    return undefined;
  };

  const isDisabled = disabled || listContext?.disabled || false;
  const listItemVariant = getListContainer() || variant;

  const testID = props.testID || 'list-action';

  styles.useVariants({
    variant: listItemVariant,
    disabled: isDisabled,
    active,
    showDisabled: !listContext?.disabled && disabled,
    isFirstChild: isFirstContext,
    container: listContext?.container,
  });

  return (
    <Pressable
      {...props}
      testID={testID}
      style={[styles.container, props.style as ViewStyle]}
      disabled={isDisabled || !onPress}
    >
      <ListActionContent>
        <ListActionText>{heading}</ListActionText>
      </ListActionContent>
      <ListActionTrailingContent style={styles.centeredTrailingIcon}>
        <ListActionTrailingIcon as={ChevronRightSmallIcon} />
      </ListActionTrailingContent>
    </Pressable>
  );
};

const ListAction = createPressable({
  Root: ListActionRoot,
});

ListAction.displayName = 'ListAction';

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
      active: {
        true: {
          backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
        },
      },
      disabled: {
        true: {
          cursor: 'auto',
        },
        false: {
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
            },
          },
        },
      },
      showDisabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
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
  },
  centeredTrailingIcon: {
    justifyContent: 'center',
  },
}));

export default ListAction;
