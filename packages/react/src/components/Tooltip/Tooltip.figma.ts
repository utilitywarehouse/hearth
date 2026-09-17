// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7074-1096&m=dev
// source=./Tooltip.tsx
// component=Tooltip
import figma from 'figma';
const instance = figma.selectedInstance;

const heading = instance.getBoolean('Heading?', {
  true: instance.getString('Heading'),
  false: undefined,
});
const description = instance.getString('Description');
const align = instance.getEnum('Align', {
  'Right Center': 'rightCenter',
  'Left Center': 'leftCenter',
  'Top Right': 'topRight',
  'Top Center': 'topCenter',
  'Top Left': 'topLeft',
  'Bottom Center': 'bottomCenter',
  'Bottom Left': 'bottomLeft',
  'Bottom Right': 'bottomRight',
});

export default {
  example: figma.code`<Tooltip${figma.helpers.react.renderProp('heading', heading)} description="${description}"${figma.helpers.react.renderProp('align', align)}>
  {/* this is example content, you can replace it with your own */}
  <UnstyledIconButton label="further information">
    <InfoSmallIcon />
  </UnstyledIconButton>
</Tooltip>`,
  imports: [
    'import { Tooltip } from "@utilitywarehouse/hearth-react"',
    'import { UnstyledIconButton } from "@utilitywarehouse/hearth-react"',
    'import { InfoSmallIcon } from "@utilitywarehouse/hearth-react-icons"',
  ],
  id: 'tooltip',
};
