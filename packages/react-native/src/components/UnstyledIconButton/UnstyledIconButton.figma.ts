// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2926%3A2430
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/UnstyledIconButton/UnstyledIconButton.tsx
// component=UnstyledIconButton
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('Size', { 'SM-20': 'sm', 'MD-24': 'md' });
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Active: 'active',
  Focus: 'focus',
  Disabled: 'disabled',
  Loading: 'loading',
});
const disabled = state === 'disabled';
const loading = state === 'loading';
const inverted = instance.getBoolean('Inverted?');
const icon =
  size === 'sm'
    ? instance.getInstanceSwap('Icon-20')?.executeTemplate().example
    : instance.getInstanceSwap('Icon-24')?.executeTemplate().example;

export default {
  id: 'unstyled-icon-button',
  imports: ['import { UnstyledIconButton } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<UnstyledIconButton${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp('disabled', disabled)}${figma.helpers.react.renderProp(
    'loading',
    loading
  )}${figma.helpers.react.renderProp('inverted', inverted)}${figma.helpers.react.renderProp(
    'icon',
    icon
  )} />`,
  metadata: { nestable: true, props: { size, state, disabled, loading, inverted, icon } },
};
