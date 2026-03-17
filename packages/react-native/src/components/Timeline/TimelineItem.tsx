import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import type { TimelineItemProps } from './Timeline.props';

const TimelineItem = ({
  children,
  helperText,
  label,
  position = 'single',
  state = 'incomplete',
  style,
  variant = 'static',
  ...rest
}: TimelineItemProps) => {
  styles.useVariants({ position, state, variant });

  const accessibilityLabel = [
    label,
    helperText,
    variant === 'progress' ? `Step ${state}` : undefined,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <View
      style={[styles.item, style as ViewStyle]}
      accessible
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      <View style={styles.indicatorColumn}>
        {(position === 'middle' || position === 'end') && <View style={styles.topConnector} />}
        <View style={styles.circle}>
          {variant === 'progress' && state === 'complete' ? (
            <Icon as={TickSmallIcon} width={20} height={20} style={styles.completeIcon} />
          ) : variant === 'progress' && state === 'active' ? (
            <View style={styles.activeInnerDot} />
          ) : null}
        </View>
        {(position === 'start' || position === 'middle') && <View style={styles.bottomConnector} />}
      </View>
      <View style={styles.content}>
        <View style={styles.textContent}>
          <BodyText size="md" weight="semibold" style={styles.label}>
            {label}
          </BodyText>
          {helperText ? (
            <BodyText size="md" style={styles.helperText}>
              {helperText}
            </BodyText>
          ) : null}
        </View>
        {children ? <View style={styles.customContent}>{children}</View> : null}
      </View>
    </View>
  );
};

TimelineItem.displayName = 'TimelineItem';

const styles = StyleSheet.create(theme => ({
  item: {
    flexDirection: 'row',
    gap: theme.components.timeline.gap,
    width: '100%',
  },
  indicatorColumn: {
    alignItems: 'center',
    variants: {
      variant: {
        static: {
          width: theme.components.timeline.static.circle.width,
        },
        progress: {
          width: theme.components.timeline.progress.circle.width,
        },
      },
    },
  },
  topConnector: {
    width: theme.components.timeline.bar.width,
    variants: {
      variant: {
        static: {
          height: theme.components.timeline.static.circle.height / 2,
          backgroundColor: theme.color.surface.brand.default,
        },
        progress: {
          height: 0,
        },
      },
      state: {
        complete: {},
        active: {},
        incomplete: {},
      },
    },
    compoundVariants: [
      {
        variant: 'progress',
        state: 'complete',
        styles: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      {
        variant: 'progress',
        state: 'active',
        styles: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      {
        variant: 'progress',
        state: 'incomplete',
        styles: {
          backgroundColor: theme.color.border.subtle,
        },
      },
    ],
  },
  bottomConnector: {
    flex: 1,
    minHeight: theme.components.timeline.content.paddingBottom,
    width: theme.components.timeline.bar.width,
    variants: {
      variant: {
        static: {
          backgroundColor: theme.color.surface.brand.default,
        },
        progress: {},
      },
      state: {
        complete: {},
        active: {},
        incomplete: {},
      },
    },
    compoundVariants: [
      {
        variant: 'progress',
        state: 'complete',
        styles: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      {
        variant: 'progress',
        state: 'active',
        styles: {
          backgroundColor: theme.color.border.subtle,
        },
      },
      {
        variant: 'progress',
        state: 'incomplete',
        styles: {
          backgroundColor: theme.color.border.subtle,
        },
      },
    ],
  },
  circle: {
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    variants: {
      variant: {
        static: {
          width: theme.components.timeline.static.circle.width,
          height: theme.components.timeline.static.circle.height,
          backgroundColor: theme.color.surface.brand.default,
        },
        progress: {
          width: theme.components.timeline.progress.circle.width,
          height: theme.components.timeline.progress.circle.height,
        },
      },
      state: {
        complete: {},
        active: {},
        incomplete: {},
      },
    },
    compoundVariants: [
      {
        variant: 'progress',
        state: 'complete',
        styles: {
          backgroundColor: theme.color.surface.brand.default,
        },
      },
      {
        variant: 'progress',
        state: 'active',
        styles: {
          backgroundColor: theme.color.surface.neutral.subtle,
          borderWidth: theme.borderWidth[2],
          borderColor: theme.color.surface.brand.default,
        },
      },
      {
        variant: 'progress',
        state: 'incomplete',
        styles: {
          backgroundColor: theme.color.surface.neutral.subtle,
          borderWidth: theme.borderWidth[2],
          borderColor: theme.color.border.subtle,
        },
      },
    ],
  },
  activeInnerDot: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.color.surface.brand.default,
  },
  completeIcon: {
    color: theme.color.text.inverted,
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: theme.components.timeline.content.gap,
    variants: {
      position: {
        single: {
          paddingBottom: 0,
        },
        start: {
          paddingBottom: theme.components.timeline.content.paddingBottom,
        },
        middle: {
          paddingBottom: theme.components.timeline.content.paddingBottom,
        },
        end: {
          paddingBottom: 0,
        },
      },
      variant: {
        static: {
          paddingTop: 0,
        },
        progress: {
          paddingTop: theme.components.timeline.content.paddingTop,
        },
      },
    },
    compoundVariants: [
      {
        position: 'start',
        variant: 'static',
        styles: {
          marginTop: -6,
        },
      },
    ],
  },
  textContent: {
    width: '100%',
  },
  label: {
    color: theme.color.text.primary,
  },
  helperText: {
    color: theme.color.text.secondary,
  },
  customContent: {
    width: '100%',
  },
}));

export default TimelineItem;
