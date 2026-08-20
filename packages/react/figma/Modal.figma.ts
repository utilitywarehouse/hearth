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

const illustrationInstance = instance.findInstance('Modal illustration');
const illustrationSwap =
  illustrationInstance && illustrationInstance.type !== 'ERROR'
    ? illustrationInstance.getInstanceSwap('Illustration')
    : undefined;
// The swapped instance is a local wrapper frame (e.g. "Spot-Piggy Bank") with no Code
// Connect of its own — the actual asset with a Code Connect definition is nested inside
// it, so find that connected descendant rather than assuming a fixed layer name/depth.
const illustrationAsset = illustrationSwap?.findConnectedInstances(() => true)[0];
const illustration = illustrationAsset?.executeTemplate().example;
const image = instance.getBoolean('Image?', {
  true: illustration,
  false: undefined,
});

const hasCustomContent = instance.getBoolean('Custom content?');
const children = hasCustomContent
  ? (instance.getSlot('Slot')?.connectedInstances.map(i => i.executeTemplate().example) ?? [])
  : undefined;

export default {
  example: figma.code`<ModalRoot>
        <ModalTrigger>
          <Button>Open modal</Button>
        </ModalTrigger>
        <Modal${figma.helpers.react.renderProp('loading', loading)}${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('description', description)}${figma.helpers.react.renderProp('loadingHeading', loadingHeading)}${figma.helpers.react.renderProp('loadingDescription', loadingDescription)}${figma.helpers.react.renderProp('hideCloseButton', hideCloseButton)}${figma.helpers.react.renderProp('fullScreen', fullScreen)}${figma.helpers.react.renderProp('image', image)}>
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
