// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6300-2825&m=dev
// source=../src/components/Modal/Modal.tsx
// component=Modal
import figma from 'figma';
const instance = figma.selectedInstance;

const loading = instance.getEnum('State', {
  Default: false,
  Loading: true,
});
const heading = instance.getString('Heading');
const description = instance.getString('Description');
const loadingHeading = instance.getString('Loading heading');
const showDescription = instance.getBoolean('Description?');
const loadingDescription = showDescription ? instance.getString('Description') : undefined;
const hideCloseButton = instance.getBoolean('Close?', {
  true: false,
  false: true,
});
const fullScreen = instance.getBoolean('Full screen?');
// Modal illustration is a Figma-only component without a Code Connect file, so the image
// prop cannot be automatically generated from the Figma instance
const hasCustomContent = instance.getBoolean('Custom content?');
const children = hasCustomContent
  ? (instance.getSlot('Slot')?.connectedInstances.map(i => i.executeTemplate().example) ?? [])
  : undefined;

export default {
  example: figma.code`<ModalRoot>
        <ModalTrigger>
          <Button>Open modal</Button>
        </ModalTrigger>
        <Modal${figma.helpers.react.renderProp('loading', loading)}${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('description', description)}${figma.helpers.react.renderProp('loadingHeading', loadingHeading)}${figma.helpers.react.renderProp('loadingDescription', loadingDescription)}${figma.helpers.react.renderProp('hideCloseButton', hideCloseButton)}${figma.helpers.react.renderProp('fullScreen', fullScreen)}>
          ${children ? children.flat() : ''}
          <ModalFooter>
            <ModalClose>
              <Button variant="ghost" colorScheme="functional">
                Cancel
              </Button>
            </ModalClose>
            <ModalClose>
              <Button variant="solid" colorScheme="highlight">
                Primary
              </Button>
            </ModalClose>
          </ModalFooter>
        </Modal>
      </ModalRoot>`,
  imports: [
    'import { Modal } from "@utilitywarehouse/hearth-react"',
    'import { Button } from "@utilitywarehouse/hearth-react"',
    'import { ModalRoot } from "@utilitywarehouse/hearth-react"',
    'import { ModalTrigger } from "@utilitywarehouse/hearth-react"',
    'import { ModalClose } from "@utilitywarehouse/hearth-react"',
    'import { ModalFooter } from "@utilitywarehouse/hearth-react"',
  ],
  id: 'modal',
};
