import { Modal } from '@utilitywarehouse/hearth-react';

const Local = ({ Modal }) => (
  <Modal fullScreen>Not the Hearth Modal</Modal>
);

const Component = () => (
  <Modal open fullScreen>
    Content
  </Modal>
);

export default Component;
