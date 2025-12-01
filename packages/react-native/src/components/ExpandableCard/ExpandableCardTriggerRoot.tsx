import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DetailText } from '../DetailText';
import ExpandableCardContent from './ExpandableCardContent';
import ExpandableCardHelperText from './ExpandableCardHelperText';
import ExpandableCardIcon from './ExpandableCardIcon';
import ExpandableCardLeadingContent from './ExpandableCardLeadingContent';
import ExpandableCardText from './ExpandableCardText';
import ExpandableCardTrailingContent from './ExpandableCardTrailingContent';
import ExpandableCardTrailingIcon from './ExpandableCardTrailingIcon';
import type ExpandableCardTriggerProps from './ExpandableCardTrigger.props';

const ExpandableCardTriggerRoot = ({
  heading,
  helperText,
  leadingIcon,
  leadingContent,
  badge,
  badgePosition = 'bottom',
  numericValue,
  isExpanded,
  disabled,
  states,
  children,
  ...props
}: ExpandableCardTriggerProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { active } = states || { active: false };

  const testID = props.testID || 'expandable-card-trigger';

  styles.useVariants({
    active,
    disabled: !!disabled,
  });

  const renderLeadingContent = () => {
    if (leadingIcon) {
      return (
        <ExpandableCardLeadingContent>
          <ExpandableCardIcon as={leadingIcon} />
        </ExpandableCardLeadingContent>
      );
    }

    if (leadingContent) {
      return <ExpandableCardLeadingContent>{leadingContent}</ExpandableCardLeadingContent>;
    }

    return null;
  };

  const renderDefaultContent = () => (
    <>
      {renderLeadingContent()}
      <ExpandableCardContent>
        {badgePosition === 'top' ? badge : null}
        <ExpandableCardText>{heading}</ExpandableCardText>
        {helperText && <ExpandableCardHelperText>{helperText}</ExpandableCardHelperText>}
        {badgePosition === 'bottom' ? badge : null}
      </ExpandableCardContent>
      {numericValue && (
        <DetailText size="lg" style={styles.numericValue}>
          {numericValue}
        </DetailText>
      )}
      <ExpandableCardTrailingContent style={styles.chevron}>
        <ExpandableCardTrailingIcon as={isExpanded ? ChevronUpSmallIcon : ChevronDownSmallIcon} />
      </ExpandableCardTrailingContent>
    </>
  );

  return (
    <Pressable
      {...props}
      testID={testID}
      style={[styles.container, props.style as ViewStyle]}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded, disabled }}
      accessibilityLabel={`${heading}${helperText ? `, ${helperText}` : ''}`}
    >
      {children || renderDefaultContent()}
    </Pressable>
  );
};

ExpandableCardTriggerRoot.displayName = 'ExpandableCardTriggerRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: theme.components.card.mobile.padding,
    paddingHorizontal: theme.components.card.mobile.padding,
    flexDirection: 'row',
    width: '100%',
    gap: theme.components.expandableCard.gapHorizontal,
    variants: {
      disabled: {
        true: {
          cursor: 'auto',
          opacity: theme.opacity.disabled,
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
      active: {
        true: {},
      },
    },
    compoundVariants: [
      {
        disabled: false,
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
        },
      },
    ],
  },
  chevron: {
    justifyContent: 'center',
  },
  numericValue: {
    alignSelf: 'center',
  },
}));

export default ExpandableCardTriggerRoot;
