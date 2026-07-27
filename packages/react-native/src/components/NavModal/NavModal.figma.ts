// url=https://www.figma.com/design/dLI9bmyMr42LV7dtFeW27J/Hearth-Patterns---Guides?node-id=6314-9103&t=oq3NaPLaAu3di6Db-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/NavModal/NavModal.tsx
// component=NavModal

import figma from 'figma';

const instance = figma.selectedInstance;

const showClose = instance.getBoolean('Close?');
const image = instance.getSlot('Image');
const button = instance.getBoolean('Button?', {
  true: (function () {
    const nestedLayer0 = instance.findInstance('Button');
    return {
      primaryButtonText: nestedLayer0.type !== 'ERROR' ? nestedLayer0.getString('Text') : undefined,
    };
  })(),
});
const showCarousel = instance.getBoolean('Carousel?');
const customContent = instance.getSlot('Custom content');
const colorScheme = instance.getEnum('Color Scheme', {
  Brand: 'brand',
  'Neutral Subtle': 'primary',
  'Neutral Strong': 'default',
});

const imageItems = image?.connectedInstances.map(i => i.executeTemplate().example) ?? [];
const contentItems = customContent?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

export default {
  id: 'nav-modal',
  imports: ["import { NavModal } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<NavModal${figma.helpers.react.renderProp(
    'background',
    colorScheme
  )}${figma.helpers.react.renderProp('image', imageItems.flat())}${figma.helpers.react.renderProp(
    'showCloseButton',
    showClose
  )}${figma.helpers.react.renderProp(
    'primaryButtonText',
    button.primaryButtonText
  )}>${contentItems.flat()}</NavModal>`,
  metadata: {
    props: {
      showClose,
      image: imageItems,
      button,
      showCarousel,
      customContent: contentItems,
      colorScheme,
    },
  },
};
