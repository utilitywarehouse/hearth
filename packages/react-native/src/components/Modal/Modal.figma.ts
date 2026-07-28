// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6300-2825
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Modal/Modal.tsx
// component=Modal

import figma from 'figma';

const loading = figma.selectedInstance.getEnum('State', {
  Loading: true,
});
const heading = figma.selectedInstance.getString('Heading');
const description = figma.selectedInstance.getString('Description');
const fullscreen = figma.selectedInstance.getBoolean('Full screen?');
const showHandle = figma.selectedInstance.getBoolean('Handle?');
const close = figma.selectedInstance.getBoolean('Close?');
const image = figma.selectedInstance.getBoolean('Image?', {
  true: figma.selectedInstance.getInstanceSwap('Modal illustration')?.executeTemplate().example,
});
const loadingHeading = figma.selectedInstance.getString('Loading heading');

const slot = figma.selectedInstance.getSlot('Slot');
const slotContent = slot?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

const buttons = figma.selectedInstance.getBoolean('Buttons?', {
  true: (function () {
    const nestedLayer0 = figma.selectedInstance.findInstance('Button');
    return {
      primaryButtonText: nestedLayer0.type !== 'ERROR' ? nestedLayer0.getString('Text') : undefined,
    };
  })(),
});

export default {
  id: 'modal',
  imports: [
    "import { useRef, useCallback } from 'react';",
    "import { Button, Modal, BottomSheetModal } from '@utilitywarehouse/hearth-react-native';",
  ],
  example: figma.code`function Example() {
    const modalRef = useRef<BottomSheetModal>(null);
    const handleOpenModal = useCallback(() => {
        modalRef.current?.present();
    }, []);
    const handleCloseModal = useCallback(() => {
        modalRef.current?.dismiss();
    }, []);
    return (<>
          <Button onPress={handleOpenModal}>Open Modal</Button>

          <Modal ref={modalRef}${figma.helpers.react.renderProp(
            'heading',
            heading
          )}${figma.helpers.react.renderProp(
            'description',
            description
          )}${figma.helpers.react.renderProp('loading', loading)}${figma.helpers.react.renderProp(
            'loadingHeading',
            loadingHeading
          )}${figma.helpers.react.renderProp('showCloseButton', close)}${figma.helpers.react.renderProp(
            'fullscreen',
            fullscreen
          )}${figma.helpers.react.renderProp('image', image)}${figma.helpers.react.renderProp(
            'showHandle',
            showHandle
          )}${figma.helpers.react.renderProp(
            'primaryButtonText',
            buttons.primaryButtonText
          )}${figma.helpers.react.renderProp(
            'secondaryButtonText',
            buttons.primaryButtonText
          )} onPressPrimaryButton={handleCloseModal} onPressSecondaryButton={handleCloseModal}>
            ${slotContent.flat()}
          </Modal>
        </>);
}`,
  metadata: {
    nestable: true,
    props: {
      loading,
      heading,
      description,
      fullscreen,
      showHandle,
      close,
      image,
      loadingHeading,
      slotContent,
      buttons,
    },
  },
};
