// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=8306-4665&t=3uUSBVdxldgG5uz3-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/HighlightBanner/HighlightBanner.tsx
// component=HighlightBanner

import figma from 'figma';

const heading = figma.selectedInstance.getString('Heading');
const description = figma.selectedInstance.getString('Description');
const showImage = figma.selectedInstance.getBoolean('Image?');
const imageSlot = figma.selectedInstance.getSlot('Image');
const image =
  showImage && imageSlot?.connectedInstances[0]
    ? imageSlot.connectedInstances[0].executeTemplate().example
    : '';
const headingColor = figma.selectedInstance.getEnum('Heading color', {
  Highlight: 'highlight',
  Pig: 'pig',
  Energy: 'energy',
  Broadband: 'broadband',
  Insurance: 'insurance',
  Cashback: 'cashback',
  Mobile: 'mobile',
});
const showLink = figma.selectedInstance.getBoolean('Link?');
const linkInstance = figma.selectedInstance.findInstance('Link');
const link =
  showLink && linkInstance.type !== 'ERROR' ? linkInstance.executeTemplate().example : undefined;

const showButton = figma.selectedInstance.getBoolean('Button?');
const buttonInstance = figma.selectedInstance.findInstance('Button');
const button =
  showButton && buttonInstance.type !== 'ERROR'
    ? buttonInstance.executeTemplate().example
    : undefined;

export default {
  id: 'HighlightBanner',
  imports: ["import { HighlightBanner } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`// HighlightBanner doesn't need to be wrapped in a Card
// it's a standalone component in code please see the HighlightBanner docs
// https://hearth.prod.uw.systems/react-native/?path=/docs/components-highlightbanner--docs
<HighlightBanner${figma.helpers.react.renderProp(
    'heading',
    heading
  )}${figma.helpers.react.renderProp('description', description)}${figma.helpers.react.renderProp(
    'image',
    image
  )}${figma.helpers.react.renderProp('headingColor', headingColor)}${figma.helpers.react.renderProp(
    'link',
    link
  )}${figma.helpers.react.renderProp('button', button)} />`,
  metadata: {
    nestable: true,
    props: {
      heading,
      description,
      showImage,
      image,
      headingColor,
      link,
      button,
    },
  },
};
