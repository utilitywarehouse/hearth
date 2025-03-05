import { PropDef } from './prop-def';

const colorPropDefs = {
  color: { className: 'color', responsive: false },
} satisfies {
  color: PropDef<string>;
};

interface ColorProps {
  /**
   * Set the foreground colour.
   */
  color?: string;
}

export { colorPropDefs };
export type { ColorProps };
