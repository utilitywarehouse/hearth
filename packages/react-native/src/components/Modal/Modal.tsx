import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useCallback, useImperativeHandle, useRef } from 'react';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { BottomSheetModal, BottomSheetScrollView } from '../BottomSheet';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Spinner } from '../Spinner';
import { UnstyledIconButton } from '../UnstyledIconButton';
import ModalProps from './Modal.props';

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
  image,
  primaryButtonProps,
  secondaryButtonProps,
  closeButtonProps,
  ...props
}: ModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => bottomSheetModalRef.current as BottomSheetModal);

  const handleClose = useCallback((index: number) => {
    if (index === -1) {
      // setSearch('');
      // setIsOpen(false);
      return;
    }
  }, []);

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

  const content = (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Spinner size="lg" />
          <Heading size="lg" textAlign="center">
            Loading...
          </Heading>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.headerTextContent}>
              {heading && !image ? <Heading size="lg">{heading}</Heading> : null}
              {description && !image ? <BodyText>{description}</BodyText> : null}
            </View>
            {showCloseButton ? (
              <UnstyledIconButton
                icon={CloseMediumIcon}
                onPress={handleCloseButtonPress}
                {...closeButtonProps}
              />
            ) : null}
          </View>
          {image ? (
            <View style={styles.imageContainer}>
              <Image style={styles.image} {...image} />
              <View style={styles.textContent}>
                {heading ? (
                  <Heading size="lg" textAlign="center">
                    {heading}
                  </Heading>
                ) : null}
                {description ? <BodyText textAlign="center">{description}</BodyText> : null}
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
        </>
      )}
    </>
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleClose}
      enableDynamicSizing={true}
      snapPoints={image ? ['90%'] : props.snapPoints}
      showHandle={typeof loading !== 'undefined' && loading ? false : props.showHandle}
      {...props}
    >
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        {content}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    gap: theme.components.dialog.gap,
  },
  header: {
    flexDirection: 'row',
    gap: theme.components.dialog.gap,
  },
  headerTextContent: {
    flex: 1,
    gap: theme.components.dialog.content.gap,
  },
  image: {
    width: 260,
    height: 260,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textContent: {
    gap: theme.components.dialog.content.gap,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    gap: theme.components.dialog.content.gap,
  },
  footer: {
    gap: theme.components.dialog.action.gap,
  },
}));

export default Modal;
