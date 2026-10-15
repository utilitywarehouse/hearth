// this is a comment at the beginning of the file
import * as React from 'react';
import { Modal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <div>
    <Modal open loading loadingHeading="Fetching your details...">
      Content
    </Modal>
    <Modal
      open
      loading
      loadingHeading="Please wait"
      loadingDescription="This might take a moment">
      Content
    </Modal>
    <Modal open heading="No loading state">
      Content
    </Modal>
  </div>
);

export default Component;
