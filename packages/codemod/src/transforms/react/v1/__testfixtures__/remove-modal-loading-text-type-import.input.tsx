import type { Modal } from '@utilitywarehouse/hearth-react';
import { Modal as Other } from './Other';

const Component = (props: React.ComponentProps<typeof Modal>) => (
  <Other loadingText="Not Hearth" {...props} />
);

export default Component;
