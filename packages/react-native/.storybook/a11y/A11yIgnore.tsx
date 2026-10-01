import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

// react-native-web renders `dataSet={{ a11yIgnore: true }}` as `data-a11y-ignore`.
// RN's types don't include `dataSet`, hence the cast.
const ignoreProps = { dataSet: { a11yIgnore: true } } as ViewProps;

/**
 * Story-only wrapper for scaffolding that shouldn't be accessibility-checked
 * (axe or native rules), e.g. demo controls around the component under test.
 * Prefer this over turning a rule off for the whole story.
 */
export function A11yIgnore({ children, ...props }: ViewProps & { children: ReactNode }) {
  return (
    <View {...props} {...ignoreProps}>
      {children}
    </View>
  );
}
