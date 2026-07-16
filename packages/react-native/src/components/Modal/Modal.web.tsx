import { BottomSheetScrollViewMethods, SNAP_POINT_TYPE } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useImperativeHandle, useRef } from 'react';
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
  footer,
  footerStyle,
  primaryButtonProps,
  secondaryButtonProps,
  closeButtonProps,
  testID,
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

  const hasPrimaryButton = !!(onPressPrimaryButton && primaryButtonText);
  const hasSecondaryButton = !!(onPressSecondaryButton && secondaryButtonText);
  const hasFooter = !!footer || hasPrimaryButton || hasSecondaryButton;

  const footerContent = footer ?? (
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
  );

  const content = (
    <>
      {loading ? (
        <View
          style={styles.loadingContainer}
          testID={testID}
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
          {hasFooter ? <View style={footerStyle}>{footerContent}</View> : null}
        </View>
      )}
    </>
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableDynamicSizing={true}
      snapPoints={image || fullscreen ? ['90%'] : props.snapPoints}
      showHandle={typeof loading !== 'undefined' && loading ? false : props.showHandle}
      accessible={false}
      {...props}
      onChange={handleChange}
    >
      <BottomSheetScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
        {content}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    gap: theme.components.modal.gap,
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
    justifyContent: 'center',
    flex: 1,
  },
  textContent: {
    gap: theme.components.modal.content.gap,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    gap: theme.components.modal.content.gap,
  },
  footer: {
    gap: theme.components.modal.action.gap,
  },
}));

export default Modal;
