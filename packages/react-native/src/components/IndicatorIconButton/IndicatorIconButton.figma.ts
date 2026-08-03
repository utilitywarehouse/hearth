// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6778-10672&t=3uUSBVdxldgG5uz3-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/IndicatorIconButton/IndicatorIconButton.tsx
// component=IndicatorIconButton

import figma from 'figma';

const indicator = figma.selectedInstance.getBoolean('Indicator?');
const iconName = (function () {
  const nestedLayer0 = figma.selectedInstance.findInstance('Icon Button/Unstyled');
  return nestedLayer0.type !== 'ERROR'
    ? (nestedLayer0.getInstanceSwap('Icon-24')?.executeTemplate().metadata?.props?.componentName as
        | string
        | undefined)
    : undefined;
})();
const icon = iconName ? figma.helpers.react.reactComponent(iconName) : undefined;

export default {
  id: 'IndicatorIconButton',
  imports: [
    "import { IndicatorIconButton } from '@utilitywarehouse/hearth-react-native';",
    ...(iconName
      ? [`import { ${iconName} } from '@utilitywarehouse/hearth-react-native-icons';`]
      : []),
  ],
  example: figma.code`<IndicatorIconButton${figma.helpers.react.renderProp(
    'icon',
    icon
  )}${figma.helpers.react.renderProp('indicator', indicator)} />`,
  metadata: { nestable: true, props: { indicator, icon } },
};
