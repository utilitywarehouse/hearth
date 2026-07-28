// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=8154%3A4346
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Card/CardAction/CardActionRoot.tsx
// component=CardAction

import figma from 'figma';

const state = figma.selectedInstance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Active: 'active',
  Disabled: 'disabled',
  Loading: 'loading',
});
const size = figma.selectedInstance.getEnum('Size', {
  Default: 'md',
  Large: 'lg',
});
const loading = state === 'loading';
const disabled = state === 'disabled';
const heading = figma.selectedInstance.getString('List heading');
const helperTextEnabled = figma.selectedInstance.getBoolean('Helper text?');
const helperText = helperTextEnabled ? figma.selectedInstance.getString('Helper text') : undefined;
const leadingIconEnabled = figma.selectedInstance.getBoolean('Leading Icon?');
const leadingIcon = leadingIconEnabled
  ? figma.selectedInstance.getInstanceSwap('Leading icon-24')?.executeTemplate().example
  : undefined;
const trailingIcon = figma.selectedInstance
  .getInstanceSwap('Trailing icon-20')
  ?.executeTemplate().example;
const iconContainerEnabled = figma.selectedInstance.getBoolean('Icon container?');
const badgeBottomEnabled = figma.selectedInstance.getBoolean('Badge bottom?');
const badgeRightEnabled = figma.selectedInstance.getBoolean('Badge right?');
const badgeMiddleEnabled = figma.selectedInstance.getBoolean('Badge middle?');
const badgePosition = badgeRightEnabled
  ? 'right'
  : badgeMiddleEnabled
    ? 'middle'
    : badgeBottomEnabled
      ? 'bottom'
      : undefined;

export default {
  id: 'CardAction',
  imports: ["import { CardAction } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<CardAction${figma.helpers.react.renderProp(
    'loading',
    loading
  )}${figma.helpers.react.renderProp('disabled', disabled)}${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp('heading', heading)}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}${figma.helpers.react.renderProp(
    'badgePosition',
    badgePosition
  )}${figma.helpers.react.renderProp(
    'iconContainer',
    iconContainerEnabled
  )}${figma.helpers.react.renderProp('leadingIcon', leadingIcon)}${figma.helpers.react.renderProp(
    'trailingIcon',
    trailingIcon
  )} />`,
  metadata: {
    nestable: true,
    props: {
      state,
      size,
      loading,
      disabled,
      heading,
      helperTextEnabled,
      helperText,
      leadingIconEnabled,
      leadingIcon,
      trailingIcon,
      iconContainerEnabled,
      badgeBottomEnabled,
      badgeRightEnabled,
      badgeMiddleEnabled,
      badgePosition,
    },
  },
};
