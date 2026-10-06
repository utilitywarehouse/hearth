// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=90-1455&m=dev
// source=./IconButton.tsx
// component=IconButton
import figma from 'figma';
const instance = figma.selectedInstance;

const icon24 = instance.getInstanceSwap('Icon-24')?.executeTemplate().example;
const icon20 = instance.getInstanceSwap('Icon-20')?.executeTemplate().example;
const variant = instance.getEnum('Variant', {
  Emphasis: 'emphasis',
  Solid: 'solid',
  Outline: 'outline',
  Ghost: 'ghost',
});
const colorScheme = instance.getEnum('Color Scheme', {
  Highlight: 'highlight',
  Functional: 'functional',
  Affirmative: 'affirmative',
  Destructive: 'destructive',
});
const size = instance.getEnum('Size', {
  'MD-48': 'md',
  'SM-32': 'sm',
});
const inverted = instance.getEnum('Inverted?', {
  true: true,
  False: false,
});
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Active: 'active',
  Focus: 'focus',
  Disabled: 'disabled',
  Loading: 'loading',
});
const loading = state === 'loading';

export default {
  example: figma.code`<IconButton label="A label is required"${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('inverted', inverted)}${figma.helpers.react.renderProp('loading', loading)}>${figma.helpers.react.renderChildren(icon20)}${figma.helpers.react.renderChildren(icon24)}</IconButton>`,
  imports: ['import { IconButton } from "@utilitywarehouse/hearth-react"'],
  id: 'icon-button',
};
