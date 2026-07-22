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
  loadingDescription,
  image,
  footer,
  footerStyle,
  primaryButtonProps,
  secondaryButtonProps,
  closeButtonProps,
  stickyFooter = true,
  background = 'default',
  scrollable = true,
  presentation = 'modal',
  scrollViewProps,
  useSafeAreaInsets = true,
  ...props
}: NavModalProps) => {
  const theme = useTheme();
  const backgroundOpacity = useSharedValue(0);
  const pretendContentTranslateY = useSharedValue(20);
  const isBrandBackground = background === 'brand';
  const backgroundVariant = background === 'default' ? 'neutral' : background;
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

  const hasPrimaryButton = !!(onPressPrimaryButton && primaryButtonText);
  const hasSecondaryButton = !!(onPressSecondaryButton && secondaryButtonText);
  const hasFooter = !!footer || hasPrimaryButton || hasSecondaryButton;
  const descriptionIsText = typeof description === 'string' || typeof description === 'number';
  const hasDescription = description !== undefined && description !== null;

  styles.useVariants({
    loading,
    background: backgroundVariant,
    presentation: isFullScreenPresentation ? 'fullScreen' : 'modal',
    useSafeAreaInsets,
    usesSheetPresentation,
    stickyFooter,
  });

  const footerContent = useMemo(
    () =>
      footer ?? (
        <View style={styles.footer}>
          {hasPrimaryButton ? (
            <Button
              onPress={handlePrimaryButtonPress}
              text={primaryButtonText}
              inverted={isBrandBackground}
              {...primaryButtonProps}
              variant={(primaryButtonProps?.variant as 'solid') ?? 'solid'}
              colorScheme={(primaryButtonProps?.colorScheme as 'highlight') ?? 'highlight'}
            />
          ) : null}
          {hasSecondaryButton ? (
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
      footer,
      handlePrimaryButtonPress,
      handleSecondaryButtonPress,
      hasPrimaryButton,
      hasSecondaryButton,
      isBrandBackground,
      primaryButtonProps,
      primaryButtonText,
      secondaryButtonProps,
      secondaryButtonText,
    ]
  );

  const content = (
    <>
      {loading ? (
        <View
          style={styles.loadingContainer}
          accessible={Platform.OS === 'android' ? true : undefined}
          accessibilityLabel={Platform.OS === 'android' ? (loadingHeading ?? 'Loading') : undefined}
          accessibilityHint={
            Platform.OS === 'android' && loadingDescription ? loadingDescription : undefined
          }
          screenReaderFocusable
        >
          <Spinner size="lg" color={isBrandBackground ? theme.color.icon.inverted : undefined} />
          <Heading size="lg" textAlign="center" inverted={isBrandBackground}>
            {loadingHeading}
          </Heading>
          {loadingDescription ? (
            <BodyText size="md" textAlign="center" inverted={isBrandBackground}>
              {loadingDescription}
            </BodyText>
          ) : null}
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
              {hasDescription && !image ? (
                descriptionIsText ? (
                  <BodyText accessible inverted={isBrandBackground}>
                    {description}
                  </BodyText>
                ) : (
                  description
                )
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
                {hasDescription ? (
                  descriptionIsText ? (
                    <BodyText textAlign="center" accessible inverted={isBrandBackground}>
                      {description}
                    </BodyText>
                  ) : (
                    description
                  )
                ) : null}
              </View>
            </View>
          ) : null}
          {scrollable ? (
            <ScrollView
              style={{
                flex: stickyFooter ? 1 : 0,
                marginHorizontal: -4,
              }}
              contentContainerStyle={{ paddingHorizontal: 4 }}
              {...scrollViewProps}
            >
              {children}
              {!stickyFooter && hasFooter ? (
                <View style={[styles.inNavModalFooterContainer, footerStyle]}>{footerContent}</View>
              ) : null}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: stickyFooter ? 1 : 0,
              }}
            >
              {children}
              {!stickyFooter && hasFooter ? (
                <View style={[styles.inNavModalFooterContainer, footerStyle]}>{footerContent}</View>
              ) : null}
            </View>
          )}
          {stickyFooter && hasFooter ? <View style={footerStyle}>{footerContent}</View> : null}
        </View>
      )}
    </>
  );

  return (
    <View style={styles.root}>
      {Platform.OS === 'android' && usesSheetPresentation ? (
        <Animated.View style={[styles.androidContainer, animatedBackgroundStyle]}>
          <Animated.View style={[styles.pretendContent, animatedPretendContentStyle]} />
        </Animated.View>
      ) : null}
      <Animated.View
        style={[
          styles.inNavModalContainer,
          Platform.OS === 'android' && usesSheetPresentation && animatedBackgroundStyle,
        ]}
        {...props}
      >
        <View style={styles.inNavModalContent}>{content}</View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    variants: {
      background: {
        brand: {
          backgroundColor: theme.color.background.brand,
        },
        neutral: {
          backgroundColor: theme.color.background.secondary,
        },
        primary: {
          backgroundColor: theme.color.background.primary,
        },
      },
      usesSheetPresentation: {
        true: {},
        false: {},
      },
      useSafeAreaInsets: {
        true: {},
        false: {},
      },
      stickyFooter: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      {
        usesSheetPresentation: false,
        useSafeAreaInsets: true,
        styles: {
          paddingTop: rt.insets.top,
          paddingBottom: Platform.OS === 'ios' ? rt.insets.bottom : 0,
          paddingLeft: rt.insets.left,
          paddingRight: rt.insets.right,
        },
      },
      {
        usesSheetPresentation: true,
        useSafeAreaInsets: true,
        stickyFooter: true,
        styles: {
          paddingBottom: Platform.OS === 'ios' ? rt.insets.bottom : 0,
        },
      },
    ],
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
        neutral: {
          backgroundColor: theme.color.surface.neutral.strong,
        },
        brand: {
          backgroundColor: theme.color.background.brand,
        },
        primary: {
          backgroundColor: theme.color.background.primary,
        },
      },
      presentation: {
        modal: {
          borderTopLeftRadius: theme.components.modal.borderRadius,
          borderTopRightRadius: theme.components.modal.borderRadius,
          padding: theme.components.bottomSheet.padding,
        },
        fullScreen: {
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
