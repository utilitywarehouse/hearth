import { BottomSheetScrollViewMethods, SNAP_POINT_TYPE } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { AccessibilityInfo, Image, Platform, View, findNodeHandle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { hexWithOpacity } from '../../utils';
import { BodyText } from '../BodyText';
import { BottomSheetModal, BottomSheetScrollView } from '../BottomSheet';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Spinner } from '../Spinner';
import { UnstyledIconButton } from '../UnstyledIconButton';
import ModalProps from './Modal.props';

type Modal<T = any> = BottomSheetModalMethods<T> & { triggerCloseAnimation?: () => void };

const Modal = ({
  ref,
  children,
  heading,
  description,
  showCloseButton = true,
  primaryButtonText,
  secondaryButtonText,
  onPressPrimaryButton,
  onPressCloseButton,
  onPressSecondaryButton,
  closeOnPrimaryButtonPress = true,
  closeOnSecondaryButtonPress = true,
  loading,
  fullscreen = false,
  image,
  primaryButtonProps,
  secondaryButtonProps,
  closeButtonProps,
  inNavModal = false,
  ...props
}: ModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const viewRef = useRef<View>(null);
  const scrollViewRef = useRef<BottomSheetScrollViewMethods>(null);
  const theme = useTheme();
  const backgroundOpacity = useSharedValue(0);
  const pretendContentTranslateY = useSharedValue(20);

  const triggerCloseAnimation = useCallback(() => {
    if (Platform.OS === 'android' && inNavModal) {
      pretendContentTranslateY.value = withTiming(20, {
        duration: 50,
        easing: Easing.in(Easing.quad),
      });
      backgroundOpacity.value = withTiming(0, {
        duration: 100,
        easing: Easing.in(Easing.quad),
      });
    }
  }, [Platform.OS, inNavModal, pretendContentTranslateY, backgroundOpacity]);

  useImperativeHandle(ref, () => ({
    ...(bottomSheetModalRef.current as BottomSheetModal),
    triggerCloseAnimation,
  }));

  // Trigger animations on render for inNavModal Android modal
  useEffect(() => {
    if (Platform.OS === 'android' && inNavModal) {
      backgroundOpacity.value = withDelay(
        300,
        withTiming(1, {
          duration: 200,
          easing: Easing.out(Easing.quad),
        })
      );
      pretendContentTranslateY.value = withDelay(
        500,
        withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        })
      );
    }
  }, [inNavModal, backgroundOpacity, pretendContentTranslateY]);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: hexWithOpacity(
      theme.components.overlay.backgroundColor,
      backgroundOpacity.value * (theme.components.overlay.opacity / 100)
    ),
  }));

  const animatedInNavModalStyle = useAnimatedStyle(() => ({
    backgroundColor: hexWithOpacity(
      theme.components.overlay.backgroundColor,
      backgroundOpacity.value * (theme.components.overlay.opacity / 100)
    ),
  }));

  const animatedPretendContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pretendContentTranslateY.value }],
  }));

  const handleChange = (index: number, position: number, type: SNAP_POINT_TYPE) => {
    if (index > -1) {
      // Add a small delay to ensure the modal is fully rendered
      setTimeout(() => {
        // Announce the modal opening to screen readers
        AccessibilityInfo.announceForAccessibility('Modal opened.');

        const scrollViewTargetRef = scrollViewRef.current?.getInnerViewNode();
        const targetRef = viewRef.current;
        if ((Platform.OS === 'android' && targetRef) || scrollViewTargetRef) {
          const nodeHandle = findNodeHandle(
            Platform.OS === 'android' ? targetRef : scrollViewTargetRef
          );
          if (nodeHandle) {
            AccessibilityInfo.setAccessibilityFocus(nodeHandle);
          }
        }
      }, 100);
    }
    props.onChange?.(index, position, type);
  };

  const handleCloseButtonPress = () => {
    bottomSheetModalRef.current?.dismiss();
    if (onPressCloseButton) {
      onPressCloseButton();
    }
  };

  const handlePrimaryButtonPress = () => {
    if (onPressPrimaryButton) {
      onPressPrimaryButton();
    }
    if (closeOnPrimaryButtonPress) {
      bottomSheetModalRef.current?.dismiss();
    }
  };

  const handleSecondaryButtonPress = () => {
    if (onPressSecondaryButton) {
      onPressSecondaryButton();
    }
    if (closeOnSecondaryButtonPress) {
      bottomSheetModalRef.current?.dismiss();
    }
  };

  styles.useVariants({ loading });

  const content = (
    <>
      {loading ? (
        <View
          style={styles.loadingContainer}
          accessible={Platform.OS === 'android' ? true : undefined}
          accessibilityLabel={Platform.OS === 'android' ? 'Loading' : undefined}
          screenReaderFocusable
          ref={viewRef}
        >
          <Spinner size="lg" />
          <Heading size="lg" textAlign="center">
            Loading...
          </Heading>
        </View>
      ) : (
        <View
          style={styles.container}
          accessible={Platform.OS === 'android' ? true : undefined}
          accessibilityLabel={Platform.OS === 'android' ? 'Modal content' : undefined}
          screenReaderFocusable
          ref={viewRef}
        >
          <View style={styles.header}>
            <View style={styles.headerTextContent}>
              {heading && !image ? (
                <Heading size="lg" accessible>
                  {heading}
                </Heading>
              ) : null}
              {description && !image ? <BodyText accessible>{description}</BodyText> : null}
            </View>
            {showCloseButton ? (
              <UnstyledIconButton
                icon={CloseMediumIcon}
                onPress={handleCloseButtonPress}
                accessibilityLabel="Close modal"
                {...closeButtonProps}
              />
            ) : null}
          </View>
          {image ? (
            <View style={styles.imageContainer}>
              <Image style={styles.image} {...image} />
              <View style={styles.textContent}>
                {heading ? (
                  <Heading size="lg" textAlign="center" accessible>
                    {heading}
                  </Heading>
                ) : null}
                {description ? (
                  <BodyText textAlign="center" accessible>
                    {description}
                  </BodyText>
                ) : null}
              </View>
            </View>
          ) : null}
          {children}
          <View style={styles.footer}>
            {onPressPrimaryButton && primaryButtonText ? (
              <Button
                onPress={handlePrimaryButtonPress}
                text={primaryButtonText}
                {...primaryButtonProps}
                variant={(primaryButtonProps?.variant as 'solid') ?? 'solid'}
                colorScheme={(primaryButtonProps?.colorScheme as 'highlight') ?? 'highlight'}
              />
            ) : null}
            {onPressSecondaryButton && secondaryButtonText ? (
              <Button
                onPress={handleSecondaryButtonPress}
                text={secondaryButtonText}
                {...secondaryButtonProps}
                variant={(secondaryButtonProps?.variant as 'outline') ?? 'outline'}
                colorScheme={(secondaryButtonProps?.colorScheme as 'functional') ?? 'functional'}
              />
            ) : null}
          </View>
        </View>
      )}
    </>
  );

  return inNavModal ? (
    <View style={{ flex: 1, backgroundColor: theme.color.background.primary }}>
      {Platform.OS === 'android' ? (
        <Animated.View style={[styles.androidContainer, animatedBackgroundStyle]}>
          <Animated.View style={[styles.pretendContent, animatedPretendContentStyle]} />
        </Animated.View>
      ) : null}
      <Animated.View
        style={[styles.inNavModalContainer, Platform.OS === 'android' && animatedInNavModalStyle]}
      >
        <View style={styles.inNavModalContent}>{content}</View>
      </Animated.View>
    </View>
  ) : (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableDynamicSizing={true}
      snapPoints={image || fullscreen ? ['90%'] : props.snapPoints}
      showHandle={typeof loading !== 'undefined' && loading ? false : props.showHandle}
      accessible={false}
      style={styles.modal}
      {...props}
      onChange={handleChange}
    >
      {loading ? <View style={styles.loadingTop} /> : null}
      <BottomSheetScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
        {content}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  modal: {
    gap: theme.components.modal.content.gap - theme.components.bottomSheet.gap,
  },
  container: {
    flex: 1,
    gap: theme.components.modal.gap,
    variants: {
      loading: {
        true: {
          paddingTop: 0,
        },
      },
    },
  },
  header: {
    flexDirection: 'row',
    gap: theme.components.modal.gap,
  },
  headerTextContent: {
    flex: 1,
    gap: theme.components.modal.content.gap,
  },
  image: {
    width: 260,
    height: 260,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  textContent: {
    gap: theme.components.modal.content.gap,
  },
  loadingTop: {
    borderTopLeftRadius: theme.components.modal.borderRadius,
    borderTopRightRadius: theme.components.modal.borderRadius,
    height: 16,
    backgroundColor: theme.color.surface.neutral.strong,
  },
  loadingContainer: {
    borderTopLeftRadius: theme.components.modal.borderRadius,
    borderTopRightRadius: theme.components.modal.borderRadius,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    gap: theme.components.modal.content.gap,
  },
  footer: {
    gap: theme.components.modal.action.gap,
  },
  inNavModalContainer: {
    flex: 1,
    ...(Platform.OS === 'ios' ? { backgroundColor: theme.components.overlay.backgroundColor } : {}),
  },
  inNavModalContent: {
    flex: 1,
    borderTopLeftRadius: theme.components.modal.borderRadius,
    borderTopRightRadius: theme.components.modal.borderRadius,
    backgroundColor: theme.color.surface.neutral.strong,
    gap: theme.components.modal.gap,
    padding: theme.components.modal.padding,
    paddingBottom: theme.components.modal.padding + rt.insets.bottom,
  },
  androidContainer: {
    height: rt.insets.top + 18,
    paddingLeft: theme.components.modal.padding,
    paddingRight: theme.components.modal.padding,
    justifyContent: 'flex-end',
  },
  pretendContent: {
    borderTopLeftRadius: theme.components.modal.borderRadius,
    borderTopRightRadius: theme.components.modal.borderRadius,
    height: 12,
    backgroundColor: theme.components.parts.modalStack.backgroundColorCardTop,
  },
}));

export default Modal;
