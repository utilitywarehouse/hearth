// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=8294-3905&m=dev
// source=./CardBannerContent.tsx
// component=CardBannerContent
import figma from 'figma';
const instance = figma.selectedInstance;

const headingText = instance.findText('Banner heading');
const heading =
  (headingText.type !== 'ERROR' ? headingText.textContent : undefined) || 'The banner heading';
const descriptionText = instance.findText('Description');
const description = descriptionText.type !== 'ERROR' ? descriptionText.textContent : undefined;

const imageSlot = instance.getSlot('Image');
const image2Slot = instance.getSlot('Image2');
const image =
  imageSlot?.connectedInstances[0]?.executeTemplate().example ??
  image2Slot?.connectedInstances[0]?.executeTemplate().example;

const showClose = instance.getBoolean('Close?');

const showButton = instance.getBoolean('Button?');
const buttonInstance = instance.findInstance('Button');
const button =
  showButton && buttonInstance.type !== 'ERROR'
    ? buttonInstance.executeTemplate().example
    : undefined;

const showLink = instance.getBoolean('Link?');
const linkInstance = instance.findInstance('Link');
const link =
  showLink && linkInstance.type !== 'ERROR' ? linkInstance.executeTemplate().example : undefined;

const showChevron = instance.getBoolean('Chevron?');
const action = link ?? button;
const wrappedAction =
  action && showChevron
    ? figma.code`<CardInteraction${figma.helpers.react.renderProp('asChild', !!link)}>${action}</CardInteraction>`
    : action;

export default {
  id: 'card-banner-content',
  imports: [
    'import { CardBannerContent } from "@utilitywarehouse/hearth-react"',
    image ? 'import { CardBannerImage } from "@utilitywarehouse/hearth-react"' : '',
    showChevron ? 'import { CardInteraction } from "@utilitywarehouse/hearth-react"' : '',
    showClose ? 'import { UnstyledIconButton } from "@utilitywarehouse/hearth-react"' : '',
    showClose ? 'import { CloseSmallIcon } from "@utilitywarehouse/hearth-react-icons"' : '',
  ].filter(Boolean),
  example: figma.code`${image ? figma.code`<CardBannerImage>${image}</CardBannerImage>` : ''}
      <CardBannerContent${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('description', description)}>
        ${wrappedAction ?? ''}
      </CardBannerContent>
      ${showClose ? figma.code`<UnstyledIconButton label="close"><CloseSmallIcon /></UnstyledIconButton>` : ''}`,
  metadata: {
    nestable: true,
    props: { heading, description, image, button, link, showClose, showChevron },
  },
};
