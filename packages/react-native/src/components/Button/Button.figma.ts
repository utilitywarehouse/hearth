// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=90%3A432
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Button/Button.tsx
// component=Button

import figma from 'figma';

const instance = figma.selectedInstance;

const disabled = instance.getEnum('State', {
  Disabled: true,
});
const size = instance.getEnum('Size', {
  'SM-32': 'sm',
  'MD-48': 'md',
});
const paddingNone = instance.getEnum('Padding None?', {
  True: true,
  False: false,
});
const colorScheme = instance.getEnum('Color Scheme', {
  Affirmative: 'affirmative',
  Destructive: 'destructive',
  Functional: 'functional',
  Highlight: 'highlight',
});
const loading = instance.getEnum('State', {
  Loading: true,
});
const text = instance.getString('Text');
const ghostText = instance.getString('Ghost Text');
const iconPosition = instance.getBoolean('Show icon left?', {
  true: undefined,
  false: instance.getBoolean('Show icon right?', {
    true: 'right',
    false: undefined,
  }),
});
const icon = instance.getBoolean('Show icon left?', {
  true: instance.getInstanceSwap('Icon left-20')?.executeTemplate().example,
  false: instance.getBoolean('Show icon right?', {
    true: instance.getInstanceSwap('Icon right-20')?.executeTemplate().example,
    false: undefined,
  }),
});
const variant = instance.getEnum('Variant', {
  Emphasis: 'emphasis',
  Solid: 'solid',
  Outline: 'outline',
  Ghost: 'ghost',
});
const inverted = instance.getEnum('Inverted?', {
  True: true,
  False: false,
});

// Use ghostText for Ghost variant, text for all others
const childrenContent = variant === 'ghost' ? ghostText : text;

export default {
  id: 'Button',
  imports: ["import { Button } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Button${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp(
    'variant',
    variant
  )}${figma.helpers.react.renderProp('inverted', inverted)}${figma.helpers.react.renderProp(
    'paddingNone',
    paddingNone
  )}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp(
    'loading',
    loading
  )}${figma.helpers.react.renderProp('icon', icon)}${figma.helpers.react.renderProp(
    'iconPosition',
    iconPosition
  )}>
    ${figma.helpers.react.renderChildren(childrenContent)}
  </Button>`,
  metadata: {
    nestable: true,
    props: {
      disabled,
      size,
      paddingNone,
      colorScheme,
      loading,
      text,
      ghostText,
      iconPosition,
      icon,
      variant,
      inverted,
    },
  },
};
