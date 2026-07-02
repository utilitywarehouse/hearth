// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4340-1252&m=dev
// source=../src/components/SegmentedControl/SegmentedControlOption.tsx
// component=SegmentedControlOption
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const hasIcon = instance.getBoolean('Icon?');
const iconInstance = hasIcon ? instance.getInstanceSwap('Icon-20') : null;
let iconCode;
if (iconInstance && iconInstance.type === 'INSTANCE') {
  iconCode = iconInstance.executeTemplate().example;
}

  example: figma.code`<SegmentedControlOption value="${label}" label="${label}"${iconCode ? figma.code` icon={${iconCode}}` : ''} />`,
  imports: ['import { SegmentedControlOption } from "@utilitywarehouse/hearth-react"'],
  id: 'segmented-control-option',
  metadata: { nestable: true },
};
