import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetScrollViewMethods,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, LayoutChangeEvent, Platform, View, findNodeHandle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { BodyText } from '../BodyText';
import { BottomSheetModal, BottomSheetScrollView } from '../BottomSheet';
import { useBottomSheetContext } from '../BottomSheet/BottomSheet.context';
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
  loadingDescription,
  fullscreen = false,
  image,
  footer,
  footerStyle,
  primaryButtonProps,
  secondaryButtonProps,
  closeButtonProps,
  stickyFooter = true,
  testID,
  ...props
}: ModalProps) => {
  const theme = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const viewRef = useRef<View>(null);
  const scrollViewRef = useRef<BottomSheetScrollViewMethods>(null);
  const [stickyFooterHeight, setStickyFooterHeight] = useState(0);
  const { useSafeAreaInsets } = useBottomSheetContext();

  useImperativeHandle(ref, () => ({
    ...(bottomSheetModalRef.current as BottomSheetModal),
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

  const handleCloseButtonPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    if (onPressCloseButton) {
      onPressCloseButton();
    }
  }, [onPressCloseButton]);

  const handlePrimaryButtonPress = useCallback(() => {
    if (onPressPrimaryButton) {
      onPressPrimaryButton();
    }
    if (closeOnPrimaryButtonPress) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [closeOnPrimaryButtonPress, onPressPrimaryButton]);

  const handleSecondaryButtonPress = useCallback(() => {
    if (onPressSecondaryButton) {
      onPressSecondaryButton();
    }
    if (closeOnSecondaryButtonPress) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [closeOnSecondaryButtonPress, onPressSecondaryButton]);

  const handleStickyFooterLayout = useCallback((event: LayoutChangeEvent) => {
    const nextHeight = Math.ceil(event.nativeEvent.layout.height);

    setStickyFooterHeight(currentHeight =>
      currentHeight === nextHeight ? currentHeight : nextHeight
    );
  }, []);

  const hasPrimaryButton = !!(onPressPrimaryButton && primaryButtonText);
  const hasSecondaryButton = !!(onPressSecondaryButton && secondaryButtonText);
  const hasFooter = !!footer || hasPrimaryButton || hasSecondaryButton;
  const shouldShowFooter = !loading && hasFooter;
  const descriptionIsText = typeof description === 'string' || typeof description === 'number';
  const hasDescription = description !== undefined && description !== null;

  styles.useVariants({
    loading,
    noButtons: !shouldShowFooter,
    stickyFooter,
    showHandle: props.showHandle,
    useSafeAreaInsets,
  });

  const footerContent = useMemo(
    () =>
      footer ?? (
        <View style={styles.footer}>
          {hasPrimaryButton ? (
            <Button
              onPress={handlePrimaryButtonPress}
              text={primaryButtonText}
              {...primaryButtonProps}
              variant={(primaryButtonProps?.variant as 'solid') ?? 'solid'}
              colorScheme={(primaryButtonProps?.colorScheme as 'highlight') ?? 'highlight'}
            />
          ) : null}
          {hasSecondaryButton ? (
            <Button
              onPress={handleSecondaryButtonPress}
              text={secondaryButtonText}
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
          testID={testID}
          accessible={Platform.OS === 'android' ? true : undefined}
          accessibilityLabel={Platform.OS === 'android' ? (loadingHeading ?? 'Loading') : undefined}
          accessibilityHint={
            Platform.OS === 'android' && loadingDescription ? loadingDescription : undefined
          }
          screenReaderFocusable
          ref={viewRef}
        >
          <Spinner size="lg" />
          <Heading size="lg" textAlign="center">
            {loadingHeading}
          </Heading>
          {loadingDescription ? <BodyText textAlign="center">{loadingDescription}</BodyText> : null}
        </View>
      ) : (
        <View
          style={styles.container}
          testID={testID}
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
              {hasDescription && !image ? (
                descriptionIsText ? (
                  <BodyText accessible>{description}</BodyText>
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
                {...closeButtonProps}
              />
            ) : null}
          </View>
          {image ? (
            <View style={styles.imageContainer}>
              {image}
              <View style={styles.textContent}>
                {heading ? (
                  <Heading size="lg" textAlign="center" accessible>
                    {heading}
                  </Heading>
                ) : null}
                {hasDescription ? (
                  descriptionIsText ? (
                    <BodyText textAlign="center" accessible>
                      {description}
                    </BodyText>
                  ) : (
                    description
                  )
                ) : null}
              </View>
            </View>
          ) : null}
          {children}
          {!stickyFooter && shouldShowFooter ? (
            <View style={footerStyle}>{footerContent}</View>
          ) : null}
        </View>
      )}
    </>
  );

  const renderFooter = useCallback(
    (bottomSheetFooterProps: BottomSheetFooterProps) => (
      <BottomSheetFooter {...bottomSheetFooterProps}>
        <View onLayout={handleStickyFooterLayout} style={[styles.footerWrap, footerStyle]}>
          {footerContent}
        </View>
      </BottomSheetFooter>
    ),
    [footerContent, footerStyle, handleStickyFooterLayout]
  );

  return (
    <>
      {stickyFooter && shouldShowFooter && stickyFooterHeight === 0 ? (
        <View
          accessible={false}
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          style={styles.footerMeasurementContainer}
        >
          <View onLayout={handleStickyFooterLayout} style={[styles.footerWrap, footerStyle]}>
            {footerContent}
          </View>
        </View>
      ) : null}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing={true}
        snapPoints={image || fullscreen ? ['90%'] : props.snapPoints}
        showHandle={typeof loading !== 'undefined' && loading ? false : props.showHandle}
        accessible={false}
        style={styles.modal}
        footerComponent={stickyFooter && shouldShowFooter ? renderFooter : undefined}
        {...props}
        onChange={handleChange}
      >
        {loading ? <View style={styles.loadingTop} /> : null}
        <BottomSheetScrollView
          contentContainerStyle={[
            styles.scrollView,
            stickyFooter && shouldShowFooter && stickyFooterHeight > 0
              ? { paddingBottom: stickyFooterHeight + theme.components.modal.gap }
              : null,
          ]}
          ref={scrollViewRef}
        >
          {content}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
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
      noButtons: {
        true: {
          paddingBottom: theme.components.modal.padding,
        },
      },
      stickyFooter: {
        true: {},
        false: {
          paddingBottom: theme.components.modal.padding + theme.components.bottomSheet.padding,
        },
      },
      useSafeAreaInsets: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      {
        noButtons: true,
        useSafeAreaInsets: true,
        stickyFooter: false,
        styles: {
          paddingBottom:
            rt.insets.bottom +
            theme.components.modal.padding +
            theme.components.bottomSheet.padding,
        },
      },
      {
        useSafeAreaInsets: true,
        stickyFooter: false,
        styles: {
          paddingBottom:
            rt.insets.bottom +
            theme.components.modal.padding +
            theme.components.bottomSheet.padding,
        },
      },
    ],
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
    gap: theme.components.modal.content.gap,
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
  footerMeasurementContainer: {
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
  },
  footerWrap: {
    backgroundColor: theme.color.surface.neutral.strong,
    paddingHorizontal: theme.components.bottomSheet.padding,
    variants: {
      useSafeAreaInsets: {
        true: {
          paddingBottom: theme.components.bottomSheet.padding + rt.insets.bottom,
        },
        false: {
          paddingBottom: theme.components.bottomSheet.padding,
        },
      },
    },
  },
}));

export default Modal;
