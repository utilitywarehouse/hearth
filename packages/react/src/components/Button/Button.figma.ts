// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=90-432&m=dev
// source=./Button.tsx
// component=Button
import figma from 'figma';
const instance = figma.selectedInstance;

const iconLeft = instance.getBoolean('Show icon left?', {
  true: instance.getInstanceSwap('Icon left-20')?.executeTemplate().example,
  false: undefined,
});
const iconRight = instance.getBoolean('Show icon right?', {
  true: instance.getInstanceSwap('Icon right-20')?.executeTemplate().example,
  false: undefined,
});
const size = instance.getEnum('Size', {
  'MD-48': 'md',
  'SM-32': 'sm',
});
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
const inverted = instance.getEnum('Inverted?', {
  True: true,
  False: false,
});
const paddingNone = instance.getEnum('Padding None?', {
  True: true,
  False: false,
});
const loading = instance.getEnum('State', {
  Loading: true,
});
// Ghost variant binds its label to a separate "Ghost Text" layer instead of "Text".
const children =
  variant === 'ghost' ? instance.getString('Ghost Text') : instance.getString('Text');

export default {
  example: figma.code`<Button${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('variant', variant)}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('inverted', inverted)}${figma.helpers.react.renderProp('paddingNone', paddingNone)}${figma.helpers.react.renderProp('loading', loading)}>${figma.helpers.react.renderChildren(iconLeft)}${figma.helpers.react.renderChildren(children)}${figma.helpers.react.renderChildren(iconRight)}</Button>`,
  imports: ['import { Button } from "@utilitywarehouse/hearth-react"'],
  id: 'button',
};
