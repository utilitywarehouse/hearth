import * as React from 'react';
import { Modal as HearthModal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <HearthModal open loading loadingText="Fetching your details...">
    Content
  </HearthModal>
);

export default Component;
