import figma from '@figma/code-connect';
import { useCallback, useRef } from 'react';
import { BottomSheetModal, Button, Modal } from '../';

figma.connect(
  Modal,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6300-2825',
  {
    props: {
      loading: figma.enum('State', {
        Loading: true,
      }),
      heading: figma.string('Heading'),
      description: figma.string('Description'),
      fullscreen: figma.boolean('Full screen?'),
      showHandle: figma.boolean('Handle?'),
      customContent: figma.boolean('Custom content?', {
        true: figma.instance('Custom content'),
      }),
      buttons: figma.boolean('Buttons?', {
        true: figma.nestedProps('Button', {
          primaryButtonText: figma.string('Text'),
        }),
      }),
      close: figma.boolean('Close?'),
      image: figma.boolean('Image?', {
        true: figma.instance('Modal illustration'),
      }),
      loadingHeading: figma.string('Loading heading'),
    },
    example: props => {
      const modalRef = useRef<BottomSheetModal>(null);

      const handleOpenModal = useCallback(() => {
        modalRef.current?.present();
      }, []);

      const handleCloseModal = useCallback(() => {
        modalRef.current?.dismiss();
      }, []);

      return (
        <>
          <Button onPress={handleOpenModal}>Open Modal</Button>

          <Modal
            ref={modalRef}
            heading={props.heading}
            description={props.description}
            loading={props.loading}
            loadingHeading={props.loadingHeading}
            showCloseButton={props.close}
            fullscreen={props.fullscreen}
            image={props.image}
            showHandle={props.showHandle}
            primaryButtonText={props.buttons.primaryButtonText}
            secondaryButtonText={props.buttons.primaryButtonText}
            onPressPrimaryButton={handleCloseModal}
            onPressSecondaryButton={handleCloseModal}
          >
            {props.customContent}
          </Modal>
        </>
      );
    },
  }
);
