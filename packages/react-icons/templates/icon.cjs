function template({ componentName, jsx }, { tpl }) {
  return tpl`
import { forwardRef } from 'react';
import { IconProps } from './types'

export const ${componentName.replace('Svg', '')} = forwardRef<SVGSVGElement, IconProps>(
  ({color  = 'currentColor', title, titleId, ...props}, ref) => {
    return (
  ${jsx}
    )
  }
);
${componentName.replace('Svg', '')}.displayName = '${componentName.replace('Svg', '')}';
`;
}

module.exports = template;
