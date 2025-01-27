import { PropDef } from './prop-def';

const asChildPropDef = {
  /**
   * Composes the component into its immediate child instead of rendering its own HTML element.
   * You’ll have to provide a single React Element child.
   */
  asChild: {},
} satisfies {
  asChild: PropDef<boolean>;
};

export { asChildPropDef };
