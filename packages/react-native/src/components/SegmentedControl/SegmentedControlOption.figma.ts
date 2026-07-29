// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4340-1252&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/SegmentedControl/SegmentedControlOption.tsx
// component=SegmentedControlOption

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const iconName = figma.selectedInstance.getBoolean('Icon?', {
  true: figma.selectedInstance.getInstanceSwap('Icon-20')?.executeTemplate().metadata?.props
    ?.componentName as string | undefined,
});
const icon = iconName ? figma.helpers.react.reactComponent(iconName) : undefined;

export default {
  id: 'segmented-control-option',
  imports: [
    "import { SegmentedControlOption } from '@utilitywarehouse/hearth-react-native';",
    ...(iconName
      ? [`import { ${iconName} } from '@utilitywarehouse/hearth-react-native-icons';`]
      : []),
  ],
  example: figma.code`<SegmentedControlOption value={'option'}${figma.helpers.react.renderProp(
    'icon',
    icon
  )}>
        ${figma.helpers.react.renderChildren(label)}
      </SegmentedControlOption>`,
  metadata: { nestable: true, props: { label, icon } },
};
