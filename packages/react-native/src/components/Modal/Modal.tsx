import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetScrollViewMethods,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { AccessibilityInfo, Platform, View, findNodeHandle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
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
  stickyFooter = true,
  ...props
}: ModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const viewRef = useRef<View>(null);
  const scrollViewRef = useRef<BottomSheetScrollViewMethods>(null);

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

  const noButtons = !onPressPrimaryButton && !onPressSecondaryButton;

  styles.useVariants({
    loading,
    bothButtons: !!(onPressPrimaryButton && onPressSecondaryButton),
    noButtons,
    stickyFooter,
    showHandle: props.showHandle,
  });

  const footer = useMemo(
    () => (
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
    ),
    [
      handlePrimaryButtonPress,
      handleSecondaryButtonPress,
      onPressPrimaryButton,
      onPressSecondaryButton,
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
          accessibilityLabel={Platform.OS === 'android' ? 'Loading' : undefined}
          screenReaderFocusable
          ref={viewRef}
        >
          <Spinner size="lg" />
          <Heading size="lg" textAlign="center">
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
              {image}
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
          {!stickyFooter && !noButtons ? footer : null}
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
    [footer]
  );

  return (
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
}));

export default Modal;
