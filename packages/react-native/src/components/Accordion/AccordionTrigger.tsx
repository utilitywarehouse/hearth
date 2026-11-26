import { ReactNode, useState } from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAccordionContext } from './Accordion.context';
import { useAccordionItemContext } from './AccordionItem.context';

export type AccordionTriggerRenderProps = { expanded: boolean; disabled: boolean };

type AccordionTriggerProps = Omit<PressableProps, 'children'> & {
  children?: ReactNode | ((props: AccordionTriggerRenderProps) => ReactNode);
};

const AccordionTrigger = ({ children, onPress, onPressIn, onPressOut, ...props }: AccordionTriggerProps) => {
  const [pressed, setPressed] = useState(false);
  const { noPadding: contextNoPadding } = useAccordionContext();
  const {
    noPadding,
    disabled = false,
    expanded = false,
    onPress: toggle,
    triggerId,
  } = useAccordionItemContext();
  const noPaddingValue = noPadding ?? contextNoPadding;
  styles.useVariants({ noPadding: noPaddingValue, active: pressed });

  const handlePress = (event: GestureResponderEvent) => {
    toggle?.();
    onPress?.(event);
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    setPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setPressed(false);
    onPressOut?.(event);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded, disabled }}
      aria-expanded={expanded}
      aria-disabled={disabled}
      disabled={disabled}
      nativeID={triggerId}
      style={styles.trigger}
      {...props}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {typeof children === 'function' ? children({ expanded, disabled }) : children}
    </Pressable>
  );
};

AccordionTrigger.displayName = 'AccordionTrigger';

const styles = StyleSheet.create(theme => ({
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.components.accordion.item.heading.paddingHorizontal,
    paddingVertical: theme.components.accordion.item.heading.paddingVertical,
    gap: theme.components.accordion.item.heading.gap,
    width: '100%',
    _web: {
      _hover: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
      },
      '_focus-visible': theme.helpers.focusVisible,
      _active: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
      },
    },
    variants: {
      noPadding: {
        true: {
          paddingHorizontal: 0,
        },
      },
      active: {
        true: {
          backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
        },
      },
    },
  },
}));

export default AccordionTrigger;
