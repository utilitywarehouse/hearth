// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=8154-4346&m=dev
// source=./CardActionButton.tsx
// component=CardActionButton
import figma from 'figma';
const instance = figma.selectedInstance;

const heading = instance.getString('List heading');
const helperText = instance.getBoolean('Helper text?')
  ? instance.getString('Helper text')
  : undefined;

const leadingIcon = instance.getBoolean('Leading Icon?')
  ? instance.getInstanceSwap('Leading icon-24')?.executeTemplate().example
  : undefined;

const iconContainerInstance = instance.getBoolean('Icon container?')
  ? instance.findInstance('Icon Container')
  : undefined;
const leadingIconContainerColorScheme =
  iconContainerInstance && iconContainerInstance.type !== 'ERROR'
    ? iconContainerInstance.getEnum('Color', {
        Pig: 'pig',
        Highlight: 'highlight',
        Energy: 'energy',
        Broadband: 'broadband',
        Mobile: 'mobile',
        Cashback: 'cashback',
        Insurance: 'insurance',
      })
    : undefined;

const trailingIcon = instance.getInstanceSwap('Trailing icon-20')?.executeTemplate().example;

const badgePlacement = instance.getBoolean('Badge right?')
  ? 'right'
  : instance.getBoolean('Badge middle?')
    ? 'middle'
    : instance.getBoolean('Badge bottom?')
      ? 'bottom'
      : undefined;
const badgeInstance = badgePlacement ? instance.findInstance('Badge') : undefined;
const badge =
  badgeInstance && badgeInstance.type !== 'ERROR'
    ? badgeInstance.executeTemplate().example
    : undefined;

export default {
  example: figma.code`/* CardActionLink is also available in place of CardActionButton, for actions that navigate via href. */
  <CardActionButton${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp('helperText', helperText)}${
    leadingIcon ? figma.code` leadingIcon={${leadingIcon}}` : ''
  }${figma.helpers.react.renderProp('leadingIconContainerColorScheme', leadingIconContainerColorScheme)}${
    trailingIcon ? figma.code` trailingIcon={${trailingIcon}}` : ''
  }${badge ? figma.code` badge={${badge}}` : ''}${figma.helpers.react.renderProp('badgePlacement', badgePlacement)} />`,
  imports: ['import { CardActionButton } from "@utilitywarehouse/hearth-react"'],
  id: 'card-action-button',
  metadata: { nestable: true, isCardAction: true },
};
