// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3253-8193
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Menu/MenuItem.tsx
// component=MenuItem

import figma from 'figma';

const text = figma.selectedInstance.getString('Text');
const iconName = figma.selectedInstance.getBoolean('Icon left?', {
  true: figma.selectedInstance.getInstanceSwap('Icon left-20')?.executeTemplate().metadata?.props
    ?.componentName as string | undefined,
  false: figma.selectedInstance.getBoolean('Icon right?', {
    true: figma.selectedInstance.getInstanceSwap('Icon right-20')?.executeTemplate().metadata?.props
      ?.componentName as string | undefined,
  }),
});
const icon = iconName ? figma.helpers.react.reactComponent(iconName) : undefined;
const iconPosition = figma.selectedInstance.getBoolean('Icon left?', {
  true: 'left',
  false: figma.selectedInstance.getBoolean('Icon right?', {
    true: 'right',
  }),
});
const colorScheme = figma.selectedInstance.getEnum('Color Scheme', {
  Destructive: 'destructive',
  Functional: undefined,
});
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
  Default: undefined,
  Hover: undefined,
  Active: undefined,
  Focus: undefined,
});

export default {
  id: 'MenuItem',
  imports: [
    "import { MenuItem } from '@utilitywarehouse/hearth-react-native';",
    ...(iconName
      ? [`import { ${iconName} } from '@utilitywarehouse/hearth-react-native-icons';`]
      : []),
  ],
  example: figma.code`<MenuItem${figma.helpers.react.renderProp(
    'text',
    text
  )}${figma.helpers.react.renderProp('disabled', disabled)}${figma.helpers.react.renderProp(
    'colorScheme',
    colorScheme
  )}${figma.helpers.react.renderProp('icon', icon)}${figma.helpers.react.renderProp(
    'iconPosition',
    iconPosition
  )}/>`,
  metadata: {
    props: { text, icon, iconPosition, colorScheme, disabled },
    nestable: true,
  },
};
