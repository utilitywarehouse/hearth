import figma from 'figma';

const name = figma.batch.name;

export default {
  id: figma.batch.id,
  imports: [`import { ${name} } from '@utilitywarehouse/hearth-react-native-icons';`],
  example: figma.code`<${name} />`,
  metadata: { nestable: true, props: { componentName: name } },
};
