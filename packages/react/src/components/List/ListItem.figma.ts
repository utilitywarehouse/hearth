// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2421-1628&m=dev
// source=./ListItem.tsx
// component=ListItem
import figma from 'figma';
const instance = figma.selectedInstance;

const variant = instance.getEnum('Variant', { Default: 'default', Custom: 'custom' });

// Numerical value?/Numerical value has no equivalent on ListItemButton/ListItemContentProps -
// no numeric-value prop exists anywhere in the List component family.
const heading = instance.getString('List heading');
const helperText = instance.getBoolean('Helper text?')
  ? instance.getString('Helper text')
  : undefined;

const hasBadge = instance.getBoolean('Badge?');
const badgeInstance = hasBadge ? instance.findInstance('Badge') : undefined;
const badge =
  badgeInstance && badgeInstance.type !== 'ERROR'
    ? badgeInstance.executeTemplate().example
    : undefined;

const hasLeadingContent = instance.getBoolean('Leading content?');
const leadingContentInstance = hasLeadingContent
  ? instance.findInstance('Leading content')
  : undefined;
const leadingContent =
  leadingContentInstance && leadingContentInstance.type !== 'ERROR'
    ? leadingContentInstance.getEnum('Variant', {
        Icon: leadingContentInstance.getInstanceSwap('Icon-24')?.executeTemplate().example,
      })
    : undefined;

const hasTrailingContent = instance.getBoolean('Trailing Content?');
const trailingContentInstance = hasTrailingContent
  ? instance.findInstance('Trailing content')
  : undefined;
const trailingContent =
  trailingContentInstance && trailingContentInstance.type !== 'ERROR'
    ? trailingContentInstance.getEnum('Variant', {
        Icon: trailingContentInstance.getInstanceSwap('Icon-20')?.executeTemplate().example,
      })
    : undefined;

// Variant=Custom swaps the whole ListItemButton/ListItemContent structure for the item's own
// "Slot" property - fully custom, design-authored content.
const customSlot = variant === 'custom' ? instance.getSlot('Slot') : undefined;
const customContent =
  customSlot?.connectedInstances.map(item => item.executeTemplate().example) ?? [];

export default {
  example:
    variant === 'custom'
      ? figma.code`<ListItem>${customContent.flat()}</ListItem>`
      : figma.code`<ListItem>
{/* ListItemLink is also available for links, and ListItemContent for static content. */}
<ListItemButton${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('helperText', helperText)}${
          badge ? figma.code` badge={${badge}}` : ''
        }${leadingContent ? figma.code` leadingContent={${leadingContent}}` : ''}${
          trailingContent ? figma.code` trailingContent={${trailingContent}}` : ''
        } />
</ListItem>`,
  imports: ['import { ListItem, ListItemButton } from "@utilitywarehouse/hearth-react"'],
  id: 'list-item',
  metadata: { nestable: true },
};
