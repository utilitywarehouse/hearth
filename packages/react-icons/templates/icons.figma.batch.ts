import figma from 'figma';

const name = figma.batch.name;

export default {
  id: name,
  imports: [`import { ${name} } from '@utilitywarehouse/hearth-react-icons';`],
  example: figma.code`<${name} />`,
  metadata: { props: { componentName: name } },
};
