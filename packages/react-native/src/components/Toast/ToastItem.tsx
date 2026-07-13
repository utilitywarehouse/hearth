import { CloseSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { AccessibilityInfo, Platform, Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { scheduleOnRN } from 'react-native-worklets';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import { Link } from '../Link';
import { UnstyledIconButton } from '../UnstyledIconButton';
import type { ToastInstance } from './Toast.props';

const AnimatedView = Platform.OS === 'web' ? withUnistyles(Animated.View) : Animated.View;

export interface ToastItemHandle {
  dismiss: () => void;
}

interface Props {
  toast: ToastInstance;
  onClose: (id: string) => void;
}

const ToastItem = forwardRef<ToastItemHandle, Props>(({ toast, onClose }, ref) => {
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);
  const gestureTranslateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });

    // Announce toast content to screen readers
    // Use a slight delay to ensure iOS VoiceOver picks it up
    const timer = setTimeout(() => {
      const message = typeof toast.text === 'string' ? toast.text : 'Toast notification';
      const announcement = toast.actionText ? `${message}, ${toast.actionText}` : message;
      AccessibilityInfo.announceForAccessibility(announcement);
    }, 100);

    return () => clearTimeout(timer);
  }, [toast.text, toast.actionText, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value + gestureTranslateY.value }],
    opacity: opacity.value,
  }));

  const handleDismiss = (fromGesture = false) => {
    'worklet';
    // Call onDismiss callback if provided
    if (toast.onDismiss) {
      scheduleOnRN(toast.onDismiss);
    }
    // animate out then call onClose
    if (!fromGesture) {
      gestureTranslateY.value = 0;
    }
    // Continue from current position and animate further down
    translateY.value = withTiming(100, { duration: 250 });
    opacity.value = withTiming(0, { duration: 250 }, finished => {
      if (finished) scheduleOnRN(onClose, toast.id);
    });
  };

  useImperativeHandle(ref, () => ({
    dismiss: handleDismiss,
  }));

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      // only allow downward drag
      if (event.translationY > 0) {
        gestureTranslateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      if (event.translationY > 30 || event.velocityY > 800) {
        handleDismiss(true);
      } else {
        // spring back to original position
        gestureTranslateY.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
      }
    });

  const IconComp = toast.icon;
  const showDismissIcon = toast.showDismissIcon !== false; // default true
  const dismissOnPress = toast.dismissOnPress === true; // default false

  const handlePress = () => {
    if (toast.onPress) {
      toast.onPress();
      if (dismissOnPress) {
        handleDismiss(false);
      }
    }
  };

  const toastContent = (
    <View style={styles.inner}>
      <View style={styles.content}>
        {IconComp ? (
          <View style={styles.iconWrap}>
            <Icon as={IconComp} style={styles.icon} />
          </View>
        ) : null}
        <BodyText inverted style={styles.text}>
          {toast.text}
        </BodyText>
      </View>
      {toast.actionText ? (
        <Link onPress={handlePress} showIcon={false} inverted>
          {toast.actionText}
        </Link>
      ) : null}

      {showDismissIcon ? (
        <View style={styles.actions}>
          <UnstyledIconButton
            icon={CloseSmallIcon}
            accessibilityLabel="Dismiss"
            inverted
            onPress={() => handleDismiss(false)}
          />
        </View>
      ) : null}
    </View>
  );

  return (
    <GestureDetector gesture={panGesture}>
      <AnimatedView
        style={[styles.toast, animatedStyle]}
        {...(Platform.OS === 'ios' && {
          accessible: true,
          accessibilityRole: 'alert',
          accessibilityLiveRegion: 'polite',
        })}
        importantForAccessibility={Platform.OS === 'android' ? 'no-hide-descendants' : undefined}
      >
        {toast.onPress ? (
          <Pressable onPress={handlePress} style={styles.pressable}>
            {toastContent}
          </Pressable>
        ) : (
          toastContent
        )}
      </AnimatedView>
    </GestureDetector>
  );
});

ToastItem.displayName = 'ToastItem';

const styles = StyleSheet.create(theme => ({
  toast: {
    backgroundColor: theme.components.toast.backgroundColor,
    borderRadius: theme.components.toast.borderRadius,
    padding: theme.components.toast.padding,
    width: '95%',
  },
  pressable: {
    width: '100%',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: theme.components.toast.gap,
  },
  iconWrap: {
    width: theme.components.icon.md.width,
    height: theme.components.icon.md.height,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flexShrink: 0,
  },
  icon: {
    color: theme.color.icon.inverted,
  },
  content: {
    flex: 1,
    gap: theme.components.toast.text.gap,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  text: { flexShrink: 1 },
  actions: {
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
}));

export default ToastItem;
