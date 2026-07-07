// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7222-5935&m=dev
// source=../src/components/ExpandableCard/ExpandableCard.tsx
// component=ExpandableCard
import figma from 'figma';
const instance = figma.selectedInstance;

const heading = instance.getString('Heading');
const showHelperText = instance.getBoolean('Helper text?');
const helperText = instance.getString('Helper text');
const showLeadingContent = instance.getBoolean('Leading Content');
const showBadge = instance.getBoolean('Badge?');
const defaultOpen = instance.getBoolean('Expand');

export default {
  example: figma.code`<ExpandableCard
  heading="${heading}"${
    showHelperText
      ? figma.code`
  helperText="${helperText}"`
      : ''
  }${
    showLeadingContent
      ? figma.code`
  leadingIcon={<Icon />}`
      : ''
  }${
    showBadge
      ? figma.code`
  badge={<Badge>Badge</Badge>}`
      : ''
  }${
    defaultOpen
      ? figma.code`
  defaultOpen`
      : ''
  }
>
  {/* content */}
</ExpandableCard>`,
  imports: ['import { ExpandableCard } from "@utilitywarehouse/hearth-react"'],
  id: 'expandable-card',
};
