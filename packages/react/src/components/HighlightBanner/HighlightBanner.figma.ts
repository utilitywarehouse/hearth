// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=8306-4665&t=3uUSBVdxldgG5uz3-4
// source=./HighlightBanner.tsx
// component=HighlightBanner
import figma from 'figma';
const instance = figma.selectedInstance;

const heading = instance.getString('Heading');
const headingColor = instance.getEnum('Heading color', {
  Pig: 'pig',
  Highlight: 'highlight',
  Energy: 'energy',
  Broadband: 'broadband',
  Mobile: 'mobile',
  Insurance: 'insurance',
  Cashback: 'cashback',
});
const description = instance.getString('Description');
const showImage = instance.getBoolean('Image?');
const imageSlot = instance.getSlot('Image');
const image =
  showImage && imageSlot?.connectedInstances[0]
    ? imageSlot.connectedInstances[0].executeTemplate().example
    : undefined;
const showLink = instance.getBoolean('Link?');
const linkInstance = instance.findInstance('Link');
const link =
  showLink && linkInstance.type !== 'ERROR' ? linkInstance.executeTemplate().example : undefined;
const showButton = instance.getBoolean('Button?');
const buttonInstance = instance.findInstance('Button');
const button =
  showButton && buttonInstance.type !== 'ERROR'
    ? buttonInstance.executeTemplate().example
    : undefined;

export default {
  id: 'highlight-banner',
  imports: [
    'import { HighlightBanner } from "@utilitywarehouse/hearth-react"',
    'import { HighlightBannerContent } from "@utilitywarehouse/hearth-react"',
    button ? 'import { HighlightBannerFooter } from "@utilitywarehouse/hearth-react"' : '',
    description ? 'import { BodyText } from "@utilitywarehouse/hearth-react"' : '',
  ],
  example: figma.code`<HighlightBanner${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('headingColor', headingColor)}>
        ${image ?? ''}
      <HighlightBannerContent>
        ${description ? figma.code`<BodyText size="md" textAlign="center">${description}</BodyText>` : ''}
        ${link ?? ''}
      </HighlightBannerContent>
      ${button ? figma.code`<HighlightBannerFooter>${button}</HighlightBannerFooter>` : ''}
    </HighlightBanner>`,
  metadata: {
    nestable: true,
    props: { heading, headingColor, description, image, link, button },
  },
};
