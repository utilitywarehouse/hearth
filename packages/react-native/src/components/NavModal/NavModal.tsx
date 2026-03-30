import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { hexWithOpacity } from '../../utils';
import { BodyText } from '../BodyText';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Spinner } from '../Spinner';
import { UnstyledIconButton } from '../UnstyledIconButton';
import NavModalProps from './NavModal.props';

const NavModal = ({
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
  loading,
  loadingHeading = 'Loading...',
  image,
  primaryButtonProps,
  secondaryButtonProps,
  closeButtonProps,
  stickyFooter = true,
  background = 'default',
  scrollable = true,
  presentation = 'modal',
  scrollViewProps,
  safeAreaViewProps,
  ...props
}: NavModalProps) => {
  const theme = useTheme();
  const backgroundOpacity = useSharedValue(0);
  const pretendContentTranslateY = useSharedValue(20);
  const isBrandBackground = background === 'brand';
  const isFullScreenPresentation = presentation === 'fullScreenModal';
  const usesSheetPresentation = !isFullScreenPresentation;

  const triggerCloseAnimation = useCallback(() => {
    if (Platform.OS === 'android') {
      pretendContentTranslateY.value = withTiming(20, {
        duration: 50,
        easing: Easing.in(Easing.quad),
      });
      backgroundOpacity.value = withTiming(0, {
        duration: 100,
        easing: Easing.in(Easing.quad),
      });
    }
  }, [backgroundOpacity, pretendContentTranslateY]);

  useImperativeHandle(ref, () => ({
    triggerCloseAnimation,
  }));

  useEffect(() => {
    if (Platform.OS === 'android') {
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
  }, [backgroundOpacity, pretendContentTranslateY]);

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

  const handleCloseButtonPress = useCallback(() => {
    onPressCloseButton?.();
  }, [onPressCloseButton]);

  const handlePrimaryButtonPress = useCallback(() => {
    onPressPrimaryButton?.();
  }, [onPressPrimaryButton]);

  const handleSecondaryButtonPress = useCallback(() => {
    onPressSecondaryButton?.();
  }, [onPressSecondaryButton]);

  const noButtons = !onPressPrimaryButton && !onPressSecondaryButton;

  styles.useVariants({
    loading,
    background: isBrandBackground ? 'brand' : 'primary',
    presentation: isFullScreenPresentation ? 'fullScreen' : 'modal',
  });

  const footer = useMemo(
    () => (
      <View style={styles.footer}>
        {onPressPrimaryButton && primaryButtonText ? (
          <Button
            onPress={handlePrimaryButtonPress}
            text={primaryButtonText}
            inverted={isBrandBackground}
            {...primaryButtonProps}
            variant={(primaryButtonProps?.variant as 'solid') ?? 'solid'}
            colorScheme={(primaryButtonProps?.colorScheme as 'highlight') ?? 'highlight'}
          />
        ) : null}
        {onPressSecondaryButton && secondaryButtonText ? (
          <Button
            onPress={handleSecondaryButtonPress}
            text={secondaryButtonText}
            inverted={isBrandBackground}
            {...secondaryButtonProps}
            variant={(secondaryButtonProps?.variant as 'outline') ?? 'outline'}
            colorScheme={(secondaryButtonProps?.colorScheme as 'functional') ?? 'functional'}
          />
        ) : null}
      </View>
    ),
    [
      handlePrimaryButtonPress,
      handleSecondaryButtonPress,
      isBrandBackground,
      onPressPrimaryButton,
      onPressSecondaryButton,
      primaryButtonProps,
      primaryButtonText,
      secondaryButtonProps,
      secondaryButtonText,
    ]
  );

  const ScrollableContainer = scrollable ? ScrollView : View;

  const content = (
    <>
      {loading ? (
        <View
          style={styles.loadingContainer}
          accessible={Platform.OS === 'android' ? true : undefined}
          accessibilityLabel={Platform.OS === 'android' ? 'Loading' : undefined}
          screenReaderFocusable
        >
          <Spinner size="lg" color={isBrandBackground ? theme.color.icon.inverted : undefined} />
          <Heading size="lg" textAlign="center" inverted={isBrandBackground}>
            {loadingHeading}
          </Heading>
        </View>
      ) : (
        <View
          style={styles.container}
          accessible={Platform.OS === 'android' ? true : undefined}
          accessibilityLabel={Platform.OS === 'android' ? 'Modal content' : undefined}
          screenReaderFocusable
        >
          <View style={styles.header}>
            <View style={styles.headerTextContent}>
              {heading && !image ? (
                <Heading size="lg" accessible inverted={isBrandBackground}>
                  {heading}
                </Heading>
              ) : null}
              {description && !image ? (
                <BodyText accessible inverted={isBrandBackground}>
                  {description}
                </BodyText>
              ) : null}
            </View>
            {showCloseButton ? (
              <UnstyledIconButton
                icon={CloseMediumIcon}
                onPress={handleCloseButtonPress}
                accessibilityLabel="Close modal"
                inverted={isBrandBackground}
                {...closeButtonProps}
              />
            ) : null}
          </View>
          {image ? (
            <View style={styles.imageContainer}>
              {image}
              <View style={styles.textContent}>
                {heading ? (
                  <Heading size="lg" textAlign="center" accessible inverted={isBrandBackground}>
                    {heading}
                  </Heading>
                ) : null}
                {description ? (
                  <BodyText textAlign="center" accessible inverted={isBrandBackground}>
                    {description}
                  </BodyText>
                ) : null}
              </View>
            </View>
          ) : null}
          <ScrollableContainer
            style={{
              flex: stickyFooter ? 1 : 0,
              ...(scrollable ? { marginHorizontal: -4 } : {}),
            }}
            {...(scrollable ? { contentContainerStyle: { paddingHorizontal: 4 } } : {})}
            {...scrollViewProps}
          >
            {children}
            {!stickyFooter && !noButtons ? (
              <View style={styles.inNavModalFooterContainer}>{footer}</View>
            ) : null}
          </ScrollableContainer>
          {stickyFooter && !noButtons ? footer : null}
        </View>
      )}
    </>
  );

  const { style: safeAreaViewStyle, ...restSafeAreaViewProps } = safeAreaViewProps ?? {};

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: theme.color.background[isBrandBackground ? 'brand' : 'secondary'],
        },
        safeAreaViewStyle,
      ]}
      {...restSafeAreaViewProps}
    >
      {Platform.OS === 'android' && usesSheetPresentation ? (
        <Animated.View style={[styles.androidContainer, animatedBackgroundStyle]}>
          <Animated.View style={[styles.pretendContent, animatedPretendContentStyle]} />
        </Animated.View>
      ) : null}
      <Animated.View
        style={[
          styles.inNavModalContainer,
          Platform.OS === 'android' && usesSheetPresentation && animatedInNavModalStyle,
        ]}
        {...props}
      >
        <View style={styles.inNavModalContent}>{content}</View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
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
  imageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  textContent: {
    gap: theme.components.modal.content.gap,
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
    variants: {
      presentation: {
        modal: {
          ...(Platform.OS === 'ios'
            ? { backgroundColor: theme.components.overlay.backgroundColor }
            : {}),
        },
        fullScreen: {},
      },
    },
  },
  inNavModalContent: {
    flex: 1,
    variants: {
      background: {
        primary: {},
        brand: {
          backgroundColor: theme.color.background.brand,
        },
      },
      presentation: {
        modal: {
          borderTopLeftRadius: theme.components.modal.borderRadius,
          borderTopRightRadius: theme.components.modal.borderRadius,
          backgroundColor: theme.color.surface.neutral.strong,
          padding: theme.components.bottomSheet.padding,
        },
        fullScreen: {
          backgroundColor: theme.color.surface.neutral.strong,
          padding: theme.components.bottomSheet.padding,
        },
      },
    },
  },
  inNavModalFooterContainer: {
    paddingTop: theme.components.modal.padding,
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

export default NavModal;
