import figma from 'figma';

const name = figma.batch.name;

export default {
  id: figma.batch.id,
  imports: [`import ${name} from '@utilitywarehouse/hearth-svg-assets/lib/${figma.batch.path}';`],
  example: figma.code`<img src={${name}} alt="" />`,
};
