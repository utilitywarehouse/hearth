// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=11895-1771
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/CardAccordion/CardAccordionItem.tsx
// component=CardAccordionItem
import figma from 'figma';

const instance = figma.selectedInstance;

const title = instance.getString('Heading');
const description = instance.getBoolean('Helper text?')
  ? instance.getString('Helper text')
  : undefined;

const showSummary = instance.getBoolean('Summary?');
const descriptionListInstance = showSummary ? instance.findInstance('Description List') : undefined;
const descriptionList =
  descriptionListInstance && descriptionListInstance.type !== 'ERROR'
    ? descriptionListInstance
    : undefined;
const sectionHeaderInstance = descriptionList?.getBoolean('Section header?')
  ? descriptionList.findInstance('Section Header')
  : undefined;
const sectionHeader =
  sectionHeaderInstance && sectionHeaderInstance.type !== 'ERROR'
    ? sectionHeaderInstance
    : undefined;
const summaryTitle = sectionHeader?.getString('Heading');
// The Description List's section header becomes `summaryTitle`, so render only its items here.
const summaryItems = descriptionList
  ? descriptionList
      .findConnectedInstances(layer => layer.name === 'Item')
      .map(layer => layer.executeTemplate().example)
  : [];
const summaryDescription =
  summaryItems.length > 0
    ? figma.code` summaryDescription={<DescriptionList>${summaryItems.flat()}</DescriptionList>}`
    : showSummary
      ? figma.code` summaryDescription={<>{/* summary content */}</>}`
      : '';

export default {
  id: 'card-accordion-item',
  imports: [
    `import { CardAccordionItem${
      summaryItems.length > 0 ? ', DescriptionList' : ''
    } } from '@utilitywarehouse/hearth-react-native';`,
  ],
  example: figma.code`<CardAccordionItem value="step-1"${figma.helpers.react.renderProp(
    'title',
    title
  )}${figma.helpers.react.renderProp('description', description)}${figma.helpers.react.renderProp(
    'summaryTitle',
    summaryTitle
  )}${summaryDescription}>
  {/* step content */}
</CardAccordionItem>`,
  metadata: { nestable: true, props: { title, description, summaryTitle, showSummary } },
};
