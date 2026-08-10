// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9661-5128&m=dev
// source=../src/components/List/ListActionButton.tsx
// component=ListActionButton
import figma from 'figma';
const instance = figma.selectedInstance;

const children = instance.getString('Action heading');

export default {
  // Per List.docs.mdx and the List.stories.tsx ListActions story, ListActionButton/ListActionLink
  // must be wrapped in a ListItem.
  example: figma.code`{/* ListActionLink is also available for links. */}
<ListItem>
  <ListActionButton>${figma.helpers.react.renderChildren(children)}</ListActionButton>
</ListItem>`,
  imports: [
    'import { ListItem, ListActionButton } from "@utilitywarehouse/hearth-react"',
  ],
  id: 'list-action-button',
  metadata: { nestable: true },
};
