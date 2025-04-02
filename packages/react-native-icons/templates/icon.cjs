function template({ componentName, jsx }, { tpl }) {
  // we need to remove the xmlns attribute as it is web specific
  const filteredAttributes = jsx.openingElement.attributes.filter(
    attr => attr.name.name !== 'xmlns'
  );
  jsx.openingElement.attributes = filteredAttributes;

  return tpl`
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types'

const ${componentName} = ({color  = 'currentColor', ...props}: IconProps) => (
  ${jsx}
);

export default ${componentName}
`;
}

module.exports = template;
