import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetScrollViewMethods,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Dimensions,
  Platform,
  ScrollView,
  View,
  findNodeHandle,
} from 'react-native';
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
  loadingHeading = 'Loading...',
  fullscreen = false,
  image,
  primaryButtonProps,
  secondaryButtonProps,
  closeButtonProps,
  inNavModal = false,
  stickyFooter = true,
  background = 'default',
  scrollable = true,
  ...props
}: ModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const viewRef = useRef<View>(null);
  const scrollViewRef = useRef<BottomSheetScrollViewMethods>(null);
  const theme = useTheme();
  const backgroundOpacity = useSharedValue(0);
  const pretendContentTranslateY = useSharedValue(20);
  const isBrandBackground = background === 'brand';

  const [inNavModalHeight, setInNavModalHeight] = useState<number>();

  const isNavModalFullScreen = useMemo(() => {
    if (!inNavModalHeight || !inNavModal) return false;

    const screenHeight = Dimensions.get('window').height;

    return inNavModalHeight >= screenHeight;
  }, [inNavModalHeight, inNavModal]);

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

  const noButtons = !onPressPrimaryButton && !onPressSecondaryButton;

  styles.useVariants({
    loading,
    bothButtons: !!(onPressPrimaryButton && onPressSecondaryButton),
    noButtons,
    stickyFooter,
    showHandle: props.showHandle,
    background: isBrandBackground ? 'brand' : 'primary',
    ...(inNavModal && {
      fullscreen: isNavModalFullScreen,
    }),
  });

  const footer = (
    <View style={styles.footer}>
      {onPressPrimaryButton && primaryButtonText ? (
        <Button
          onPress={handlePrimaryButtonPress}
          text={primaryButtonText}
          inverted={isBrandBackground && inNavModal}
          {...primaryButtonProps}
          variant={(primaryButtonProps?.variant as 'solid') ?? 'solid'}
          colorScheme={(primaryButtonProps?.colorScheme as 'highlight') ?? 'highlight'}
        />
      ) : null}
      {onPressSecondaryButton && secondaryButtonText ? (
        <Button
          onPress={handleSecondaryButtonPress}
          text={secondaryButtonText}
          inverted={isBrandBackground && inNavModal}
          {...secondaryButtonProps}
          variant={(secondaryButtonProps?.variant as 'outline') ?? 'outline'}
          colorScheme={(secondaryButtonProps?.colorScheme as 'functional') ?? 'functional'}
        />
      ) : null}
    </View>
  );

  const InNavModalContainer = scrollable ? ScrollView : View;

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
          <Spinner
            size="lg"
            color={isBrandBackground && inNavModal ? theme.color.icon.inverted : undefined}
          />
          <Heading size="lg" textAlign="center" inverted={isBrandBackground && inNavModal}>
            {loadingHeading}
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
                <Heading size="lg" accessible inverted={isBrandBackground && inNavModal}>
                  {heading}
                </Heading>
              ) : null}
              {description && !image ? (
                <BodyText accessible inverted={isBrandBackground && inNavModal}>
                  {description}
                </BodyText>
              ) : null}
            </View>
            {showCloseButton ? (
              <UnstyledIconButton
                icon={CloseMediumIcon}
                onPress={handleCloseButtonPress}
                accessibilityLabel="Close modal"
                inverted={isBrandBackground && inNavModal}
                {...closeButtonProps}
              />
            ) : null}
          </View>
          {image ? (
            <View style={styles.imageContainer}>
              {image}
              <View style={styles.textContent}>
                {heading ? (
                  <Heading
                    size="lg"
                    textAlign="center"
                    accessible
                    inverted={isBrandBackground && inNavModal}
                  >
                    {heading}
                  </Heading>
                ) : null}
                {description ? (
                  <BodyText
                    textAlign="center"
                    accessible
                    inverted={isBrandBackground && inNavModal}
                  >
                    {description}
                  </BodyText>
                ) : null}
              </View>
            </View>
          ) : null}
          {inNavModal && (
            <InNavModalContainer
              style={{
                flex: stickyFooter ? 1 : 0,
                ...(scrollable ? { marginHorizontal: -1 } : {}),
              }}
              {...(scrollable ? { contentContainerStyle: { paddingHorizontal: 1 } } : {})}
            >
              {children}
              {!stickyFooter ? (
                <View style={styles.inNavModalFooterContainer}>{footer}</View>
              ) : null}
            </InNavModalContainer>
          )}
          {!inNavModal && children}
          {((!stickyFooter && !inNavModal) || (inNavModal && stickyFooter)) && !noButtons
            ? footer
            : null}
        </View>
      )}
    </>
  );

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props}>
        <View style={styles.footerWrap}>{footer}</View>
      </BottomSheetFooter>
    ),
    [
      onPressPrimaryButton,
      primaryButtonText,
      onPressSecondaryButton,
      secondaryButtonText,
      primaryButtonProps,
      secondaryButtonProps,
    ]
  );

  return inNavModal ? (
    <View
      onLayout={e => {
        setInNavModalHeight(e.nativeEvent.layout.height);
      }}
      style={{
        flex: 1,
        backgroundColor: theme.color.background[isBrandBackground ? 'brand' : 'primary'],
      }}
    >
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
      footerComponent={stickyFooter && !noButtons ? renderFooter : undefined}
      {...props}
      onChange={handleChange}
    >
      {loading ? <View style={styles.loadingTop} /> : null}
      <BottomSheetScrollView contentContainerStyle={styles.scrollView} ref={scrollViewRef}>
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
  scrollView: {
    flex: 1,
    variants: {
      bothButtons: {
        true: {
          paddingBottom:
            166 +
            rt.insets.bottom -
            theme.components.modal.padding +
            theme.components.bottomSheet.padding,
        },
        false: {
          paddingBottom:
            102 +
            rt.insets.bottom -
            theme.components.modal.padding +
            theme.components.bottomSheet.padding,
        },
      },
      noButtons: {
        true: {
          paddingBottom:
            rt.insets.bottom +
            theme.components.modal.padding +
            theme.components.bottomSheet.padding,
        },
      },
      stickyFooter: {
        true: {},
        false: {
          paddingBottom:
            rt.insets.bottom +
            theme.components.modal.padding +
            theme.components.bottomSheet.padding,
        },
      },
    },
  },
  header: {
    flexDirection: 'row',
    gap: theme.components.modal.gap,
    variants: {
      showHandle: {
        true: {},
        false: {
          marginTop: -6,
        },
      },
    },
  },
  headerTextContent: {
    flex: 1,
    gap: theme.components.modal.content.gap,
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
  footerWrap: {
    backgroundColor: theme.color.surface.neutral.strong,
    paddingHorizontal: theme.components.bottomSheet.padding,
    paddingBottom: theme.components.bottomSheet.padding + rt.insets.bottom,
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
    paddingBottom: theme.components.bottomSheet.padding + rt.insets.bottom,
    variants: {
      background: {
        primary: {},
        brand: {
          backgroundColor: theme.color.background.brand,
        },
      },
      fullscreen: {
        true: {
          padding: theme.components.bottomSheet.padding,
          paddingTop: rt.insets.top,
        },
        false: {
          padding: theme.components.bottomSheet.padding,
        },
      },
    },
  },
  inNavModalFooterContainer: {
    paddingTop: theme.components.bottomSheet.padding,
  },
  androidContainer: {
    height: rt.insets.top + 18,
    paddingLeft: theme.components.bottomSheet.padding,
    paddingRight: theme.components.bottomSheet.padding,
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
