import figma from 'figma';

const { name, path: assetPath, themed, light, dark } = figma.batch;

/**
 * Light/dark theme pairs render as a single ThemedImage; assets without a
 * theme counterpart (logos, emoji colour variants) render as a bare SVG
 * component, matching how RatingEmoji consumes them internally.
 */
export default themed
  ? {
      id: figma.batch.id,
      imports: [
        `import { ThemedImage } from '@utilitywarehouse/hearth-react-native';`,
        `import ${light.name} from '@utilitywarehouse/hearth-svg-assets/lib/${light.path}';`,
        `import ${dark.name} from '@utilitywarehouse/hearth-svg-assets/lib/${dark.path}';`,
      ],
      example: figma.code`<ThemedImage light={${light.name}} dark={${dark.name}} />`,
    }
  : {
      id: figma.batch.id,
      imports: [`import ${name} from '@utilitywarehouse/hearth-svg-assets/lib/${assetPath}';`],
      example: figma.code`<${name} />`,
    };
